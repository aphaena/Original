import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation.jsx'; // Assurez-vous que le chemin est correct

const RecipesManager = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]); // Ajout de l'état pour les catégories
  const [newCategory, setNewCategory] = useState(''); 
  const [newRecipe, setNewRecipe] = useState({ title: '', description: '', steps: '', prepTime: 0, category: '' });
  const [editRecipeId, setEditRecipeId] = useState(null);
  const [editRecipe, setEditRecipe] = useState({});
  const [editNewCategory, setEditNewCategory] = useState('');
  const APIURL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${APIURL}/api/v1/recipes`);
      const data = await response.json();
      if (data && data.data && data.data.recipes) {
        setRecipes(data.data.recipes);
        const extractedCategories = new Set(data.data.recipes.map(recipe => recipe.category));
        setCategories([...extractedCategories]);
      } else {
        console.error('Données de recettes non trouvées dans la réponse');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des recettes:', error);
    }
  };
  

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditRecipe(prev => ({ ...prev, [name]: value }));
    } else {
      setNewRecipe(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === 'other') {
      setEditRecipe(prev => ({ ...prev, category: 'other' }));
      setEditNewCategory(newCategory); // Réinitialiser editNewCategory si 'other' est sélectionné
    } else {
      setEditRecipe(prev => ({ ...prev, category: selectedCategory }));
      setEditNewCategory(''); // Effacer editNewCategory si une catégorie existante est sélectionnée
    }
  };
  
  const handleEditNewCategoryChange = (e) => {
    setEditNewCategory(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setNewRecipe(prev => ({ ...prev, category: selectedCategory }));
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const addRecipe = async () => {
    try {
      const recipeData = { ...newRecipe };
      if (recipeData.category === 'other') {
        recipeData.category = newCategory;
        if (newCategory && !categories.includes(newCategory)) {
          setCategories([...categories, newCategory]);
        }
      }
      console.log("Envoi de la recette:", recipeData);

      const response = await fetch(`${APIURL}/api/v1/recipes/recipe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData)
      });
      if (response.ok) {
        fetchRecipes();
        setNewRecipe({ title: '', description: '', steps: '', prepTime: 0, category: '' });
        setNewCategory('');
      }
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur lors de l\'ajout de la recette:', errorData);
        return;
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la recette:', error);
    }
  };

  const startEdit = (recipe) => {
    setEditRecipeId(recipe._id);
    setEditRecipe({ ...recipe });
  };

  const editRecipeSubmit = async () => {
    try {
      let recipeData = { ...editRecipe };
      if (recipeData.category === 'other' && editNewCategory) {
        recipeData.category = editNewCategory;
        if (!categories.includes(editNewCategory)) {
          setCategories([...categories, editNewCategory]);
        }
      }
  
      // Assurez-vous que la catégorie est définie
      if (!recipeData.category) {
        console.error("La catégorie est requise.");
        return;
      }
  
      const response = await fetch(`${APIURL}/api/v1/recipes/recipe/${editRecipeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData)
      });
  
      if (response.ok) {
        setEditRecipeId(null);
        setEditRecipe({});
        fetchRecipes();
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de la modification de la recette:', errorData.message);
      }
    } catch (error) {
      console.error('Erreur lors de la modification de la recette:', error);
    }
  };
  
  

  const deleteRecipe = async (recipeId) => {
    try {
      const response = await fetch(`${APIURL}/api/v1/recipes/recipe/${recipeId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchRecipes();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la recette:', error);
    }
  };

 


  return (
    <div>
      <div>
      <Navigation />    
      </div>
      <h2>Gestion des Recettes</h2>
      <div>
        <input
          type="text"
          name="title"
          value={newRecipe.title}
          onChange={handleInputChange}
          placeholder="Titre de la recette"
        />
        <textarea
          name="description"
          value={newRecipe.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <textarea
          name="steps"
          value={newRecipe.steps}
          onChange={handleInputChange}
          placeholder="Étapes (séparées par des virgules)"
        />
        <input
          type="number"
          name="prepTime"
          value={newRecipe.prepTime}
          onChange={handleInputChange}
          placeholder="Temps de préparation (en minutes)"
        />
       <label htmlFor="category">Catégorie :</label>
        <select name="category" value={newRecipe.category} onChange={handleCategoryChange}>
          {categories.map(category => <option key={category} value={category}>{category}</option>)}
          <option value="other">Autre</option>
        </select>
        {newRecipe.category === 'other' && (
          <input type="text" value={newCategory} onChange={handleNewCategoryChange} placeholder="Nouvelle catégorie" />
        )}
        <button onClick={addRecipe}>Ajouter une recette</button>
      </div>
      {editRecipeId && (
        <div>
          <input
            type="text"
            name="title"
            value={editRecipe.title}
            onChange={(e) => handleInputChange(e, true)}
            placeholder="Titre de la recette"
          />
          <textarea
            name="description"
            value={editRecipe.description}
            onChange={(e) => handleInputChange(e, true)}
            placeholder="Description"
          />
          <textarea
            name="steps"
            value={editRecipe.steps}
            onChange={(e) => handleInputChange(e, true)}
            placeholder="Étapes (séparées par des virgules)"
          />
          <input
            type="number"
            name="prepTime"
            value={editRecipe.prepTime}
            onChange={(e) => handleInputChange(e, true)}
            placeholder="Temps de préparation (en minutes)"
          />
        <label htmlFor="editCategory">Catégorie :</label>
        <select name="category" value={editRecipe.category === 'other' ? 'other' : editRecipe.category} onChange={handleEditCategoryChange}>
          {categories.map(category => <option key={category} value={category}>{category}</option>)}
          <option value="other">Autre</option>
        </select>
        {editRecipe.category === 'other' && (
          <input type="text" value={editNewCategory} onChange={handleEditNewCategoryChange} placeholder="Nouvelle catégorie" />
        )}
          <button onClick={editRecipeSubmit}>Modifier la recette</button>
        </div>
                
      )}
      
     
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id}>
            {recipe.title}
            <button onClick={() => startEdit(recipe)}>Modifier</button>
            <button onClick={() => deleteRecipe(recipe._id)}>Supprimer</button>
          </li>
        ))}
      </ul>


    </div>
    
  );
};

export default RecipesManager;
