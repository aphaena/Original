const mongoose = require('mongoose');
const Ingredient = require('../models/ingredientModel'); // Remplacez par le chemin correct vers votre modèle d'ingrédient
console.log("Ingredient: "+Ingredient); // pour vérifier si l'object est bien créer


// Configuration de la connexion à MongoDB
const db = 'mongodb://localhost:27017/recettes'; // Remplacez par votre URL de MongoDB
mongoose.connect(db)
  .then(() => console.log('Connecté à la base de données MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB', err));

// Liste des ingrédients à ajouter
const ingredients = [
  { name: 'Tomate2', nutritionInfo: { calories: 18, protein: 0.9, fat: 0.2 } },
  { name: 'Pomme de terre2', nutritionInfo: { calories: 77, protein: 2.0, fat: 0.1 } },
  { name: 'Chocolat', nutritionInfo: { calories: 150, protein: 5.0, fat: 2.1 } },
  { name: 'Laitue romaine', nutritionInfo: { calories: 25, protein: 0.1, fat: 0.0 } }  
];

// Fonction pour ajouter des ingrédients
async function addIngredients() {
  try {
    for (const ingredient of ingredients) {
      console.log("ingredient:", JSON.stringify(ingredient, null, 2));
      const newIngredient = new Ingredient(ingredient);      
      console.log("newIngredient: "+newIngredient);
      await newIngredient.save();
    }
    console.log('Ingrédients ajoutés avec succès');
  } catch (err) {
    console.error('Erreur lors de l\'ajout des ingrédients', err);
  } finally {
    mongoose.disconnect();
  }
}

// Exécuter la fonction
addIngredients();
