const mongoose = require('mongoose');
const Recipe = require('../models/recipeModel'); // Remplacez par le chemin correct vers votre modèle de recette

// Configuration de la connexion à MongoDB
const db = 'mongodb://localhost:27017/recettes'; // Remplacez par votre URL de MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à la base de données MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB', err));

// Liste des recettes à ajouter
const recipes = [
  {
    title: 'Recette de Tomate',
    description: 'Une délicieuse recette de tomate...',
    ingredients: { name: 'Tomate', quantity: '2' },
    steps: ['Couper les tomates', 'Cuire les tomates'],
    prepTime: 30,
    images: ['image1.jpg', 'image2.jpg'],
    comments: {
      user: '65719f72a85ab5047e72a3eb', // Remplacez par un ObjectId valide
      text: 'Super recette !',
      rating: 5,
      createdAt: new Date()
    },
    category: 'vegetarian'
  },
  {
    title: 'Salade César',
    description: 'Une salade César classique avec une touche de croûtons croustillants.',
    ingredients: { name: 'Laitue romaine', quantity: '1 tête' },
    steps: ['Déchirer la laitue en morceaux', 'Ajouter des croûtons et du parmesan', 'Arroser de sauce César'],
    prepTime: 20,
    images: ['salade-cesar.jpg'],
    comments: {
      user: '65719f72a85ab5047e72a3eb', // Remplacez par un ObjectId valide
      text: 'Un classique toujours apprécié !',
      rating: 5,
      createdAt: new Date()
    },
    category: 'quick'
  },
  {
    title: 'Gâteau au Chocolat',
    description: 'Un gâteau au chocolat moelleux et riche pour les amateurs de chocolat.',
    ingredients: { name: 'Chocolat', quantity: '200g' },
    steps: ['Faire fondre le chocolat', 'Mélanger avec du beurre et du sucre', 'Ajouter des œufs et de la farine', 'Cuire au four'],
    prepTime: 60,
    images: ['gateau-chocolat.jpg'],
    comments: {
      user: '65719f72a85ab5047e72a3eb', // Remplacez par un ObjectId valide
      text: 'Le meilleur gâteau au chocolat !',
      rating: 5,
      createdAt: new Date()
    },
    category: 'dessert'
  }
  

];

// Fonction pour ajouter des recettes
async function addRecipes() {
  try {
    for (const recipe of recipes) {
      const newRecipe = new Recipe(recipe);
      await newRecipe.save();
    }
    console.log('Recettes ajoutées avec succès');
  } catch (err) {
    console.error('Erreur lors de l\'ajout des recettes', err);
  } finally {
    mongoose.disconnect();
  }
}

// Exécuter la fonction
addRecipes();
