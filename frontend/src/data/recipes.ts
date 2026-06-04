// ============================================================
// Recipes Collection
// This file acts as the "recipes table" in the database.
// When connecting to a backend, replace this with API calls
// like: GET /api/recipes, GET /api/recipes/:id, etc.
// ============================================================

import { Recipe } from './types';

export const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Classic Spaghetti Carbonara',
    description: 'A creamy Italian pasta dish with eggs, cheese, and pancetta.',
    ingredients: ['spaghetti', 'eggs', 'parmesan cheese', 'pancetta', 'black pepper'],
    method: 'Boiling',
    time: 30,
    tags: ['Italian', 'Pasta', 'Quick'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400'
  },
  {
    id: '2',
    name: 'Grilled Lemon Herb Chicken',
    description: 'Juicy chicken breasts marinated in lemon and fresh herbs.',
    ingredients: ['chicken breast', 'lemon', 'garlic', 'rosemary', 'thyme', 'olive oil'],
    method: 'Grilling',
    time: 45,
    tags: ['Healthy', 'Protein', 'Gluten-Free'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400'
  },
  {
    id: '3',
    name: 'Vegetable Stir-Fry',
    description: 'Colorful mixed vegetables in a savory sauce.',
    ingredients: ['broccoli', 'carrots', 'bell peppers', 'soy sauce', 'ginger', 'garlic'],
    method: 'Stir-Frying',
    time: 20,
    tags: ['Vegan', 'Quick', 'Healthy'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400'
  },
  {
    id: '4',
    name: 'Homemade Margherita Pizza',
    description: 'Classic pizza with fresh tomatoes, mozzarella, and basil.',
    ingredients: ['pizza dough', 'tomatoes', 'mozzarella', 'basil', 'olive oil'],
    method: 'Baking',
    time: 60,
    tags: ['Italian', 'Vegetarian', 'Family'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400'
  },
  {
    id: '5',
    name: 'Beef Tacos',
    description: 'Seasoned ground beef in crispy taco shells with fresh toppings.',
    ingredients: ['ground beef', 'taco shells', 'lettuce', 'tomatoes', 'cheese', 'salsa'],
    method: 'Frying',
    time: 25,
    tags: ['Mexican', 'Quick', 'Family'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400'
  },
  {
    id: '6',
    name: 'Creamy Mushroom Risotto',
    description: 'Rich and creamy Italian rice dish with wild mushrooms.',
    ingredients: ['arborio rice', 'mushrooms', 'onion', 'white wine', 'parmesan', 'butter'],
    method: 'Slow Cooking',
    time: 45,
    tags: ['Italian', 'Vegetarian', 'Comfort Food'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400'
  },
  {
    id: '7',
    name: 'Asian Salmon Bowl',
    description: 'Teriyaki glazed salmon over rice with fresh vegetables.',
    ingredients: ['salmon fillet', 'rice', 'cucumber', 'avocado', 'sesame seeds', 'teriyaki sauce'],
    method: 'Grilling',
    time: 35,
    tags: ['Asian', 'Healthy', 'Protein'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
  },
  {
    id: '8',
    name: 'Classic French Omelette',
    description: 'Fluffy eggs filled with cheese and fresh herbs.',
    ingredients: ['eggs', 'butter', 'cheese', 'chives', 'salt', 'pepper'],
    method: 'Frying',
    time: 10,
    tags: ['French', 'Quick', 'Breakfast'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400'
  },
  {
    id: '9',
    name: 'Slow Cooked Beef Stew',
    description: 'Tender beef chunks in a rich, hearty gravy.',
    ingredients: ['beef chuck', 'potatoes', 'carrots', 'onion', 'beef broth', 'tomato paste'],
    method: 'Slow Cooking',
    time: 180,
    tags: ['Comfort Food', 'Winter', 'Family'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400'
  },
  {
    id: '10',
    name: 'Fresh Summer Salad',
    description: 'Light and refreshing salad with seasonal fruits.',
    ingredients: ['mixed greens', 'strawberries', 'blueberries', 'goat cheese', 'walnuts', 'balsamic vinaigrette'],
    method: 'Raw/No Cook',
    time: 10,
    tags: ['Healthy', 'Quick', 'Vegetarian'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400'
  },
  {
    id: '11',
    name: 'Garlic Butter Shrimp',
    description: 'Succulent shrimp sautéed in garlic butter sauce.',
    ingredients: ['shrimp', 'butter', 'garlic', 'white wine', 'parsley', 'lemon'],
    method: 'Frying',
    time: 15,
    tags: ['Seafood', 'Quick', 'social'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400'
  },
  {
    id: '12',
    name: 'Pad Thai',
    description: 'Classic Thai noodles with shrimp and peanuts.',
    ingredients: ['rice noodles', 'shrimp', 'eggs', 'bean sprouts', 'peanuts', 'lime'],
    method: 'Stir-Frying',
    time: 30,
    tags: ['Asian', 'Thai', 'social'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400'
  },
  {
    id: '13',
    name: 'Chicken Parmesan',
    description: 'Crispy breaded chicken topped with marinara and melted cheese.',
    ingredients: ['chicken breast', 'breadcrumbs', 'marinara sauce', 'mozzarella', 'parmesan', 'basil'],
    method: 'Baking',
    time: 45,
    tags: ['Italian', 'Protein', 'Family'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400'
  },
  {
    id: '14',
    name: 'Shrimp Scampi',
    description: 'Garlic butter shrimp served over linguine pasta.',
    ingredients: ['shrimp', 'linguine', 'garlic', 'butter', 'white wine', 'parsley', 'lemon'],
    method: 'Frying',
    time: 20,
    tags: ['Seafood', 'Italian', 'Quick'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=400'
  },
  {
    id: '15',
    name: 'Vegetable Curry',
    description: 'Aromatic vegetable curry with coconut milk and spices.',
    ingredients: ['potatoes', 'carrots', 'chickpeas', 'coconut milk', 'curry powder', 'onion', 'garlic'],
    method: 'Slow Cooking',
    time: 60,
    tags: ['Vegan', 'Indian', 'Comfort Food'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400'
  },
  {
    id: '16',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with creamy Caesar dressing and croutons.',
    ingredients: ['romaine lettuce', 'parmesan', 'croutons', 'caesar dressing', 'lemon', 'anchovies'],
    method: 'Raw/No Cook',
    time: 10,
    tags: ['Healthy', 'Quick', 'Vegetarian'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400'
  },
  {
    id: '17',
    name: 'Beef Stir-Fry',
    description: 'Tender beef strips with colorful vegetables in savory sauce.',
    ingredients: ['beef sirloin', 'broccoli', 'bell peppers', 'soy sauce', 'ginger', 'garlic', 'sesame oil'],
    method: 'Stir-Frying',
    time: 25,
    tags: ['Asian', 'Protein', 'Quick'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400'
  },
  {
    id: '18',
    name: 'Mushroom Soup',
    description: 'Creamy mushroom soup with fresh herbs and crusty bread.',
    ingredients: ['mushrooms', 'onion', 'garlic', 'cream', 'vegetable broth', 'thyme', 'butter'],
    method: 'Boiling',
    time: 30,
    tags: ['Vegetarian', 'Comfort Food', 'Winter'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400'
  },
  {
    id: '19',
    name: 'Grilled Vegetables',
    description: 'Seasonal vegetables grilled to perfection with herbs.',
    ingredients: ['zucchini', 'eggplant', 'bell peppers', 'olive oil', 'rosemary', 'garlic'],
    method: 'Grilling',
    time: 20,
    tags: ['Vegan', 'Healthy', 'Quick'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400'
  },
  {
    id: '20',
    name: 'Pasta Primavera',
    description: 'Fresh pasta with spring vegetables in light garlic sauce.',
    ingredients: ['penne pasta', 'asparagus', 'peas', 'cherry tomatoes', 'garlic', 'parmesan', 'olive oil'],
    method: 'Boiling',
    time: 25,
    tags: ['Italian', 'Vegetarian', 'Spring'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400'
  },
  {
    id: '21',
    name: 'Thai Green Curry',
    description: 'Fragrant Thai curry with vegetables and coconut milk.',
    ingredients: ['chicken breast', 'coconut milk', 'bell peppers', 'zucchini', 'curry powder', 'garlic', 'rice'],
    method: 'Slow Cooking',
    time: 40,
    tags: ['Asian', 'Thai', 'Curry'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400'
  },
  {
    id: '22',
    name: 'Lemon Garlic Pasta',
    description: 'Simple yet flavorful pasta with fresh lemon and garlic.',
    ingredients: ['spaghetti', 'garlic', 'lemons', 'olive oil', 'parmesan', 'fresh parsley'],
    method: 'Boiling',
    time: 20,
    tags: ['Italian', 'Quick', 'Vegetarian'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400'
  },
  {
    id: '23',
    name: 'Stuffed Bell Peppers',
    description: 'Colorful bell peppers stuffed with seasoned rice and ground beef.',
    ingredients: ['bell peppers', 'ground beef', 'rice', 'tomatoes', 'onions', 'mozzarella'],
    method: 'Baking',
    time: 45,
    tags: ['Family', 'Comfort Food', 'Protein'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400'
  },
  {
    id: '24',
    name: 'Shrimp Tacos',
    description: 'Zesty shrimp tacos with crunchy cabbage slaw.',
    ingredients: ['shrimp', 'tortillas', 'cabbage', 'lemons', 'garlic', 'tomatoes'],
    method: 'Frying',
    time: 25,
    tags: ['Mexican', 'Seafood', 'Quick'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400'
  },
  {
    id: '25',
    name: 'Steamed Dumplings',
    description: 'Delicate dumplings filled with ground turkey and vegetables.',
    ingredients: ['ground turkey', 'dumpling wrappers', 'cabbage', 'garlic', 'soy sauce', 'ginger'],
    method: 'Steaming',
    time: 30,
    tags: ['Asian', 'Chinese', 'Appetizer'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400'
  },
  {
    id: '26',
    name: 'Roast Chicken Thighs',
    description: 'Juicy roasted chicken thighs with herbs and roasted potatoes.',
    ingredients: ['chicken thighs', 'potatoes', 'garlic', 'lemons', 'olive oil', 'oregano'],
    method: 'Roasting',
    time: 50,
    tags: ['Comfort Food', 'Family', 'Protein'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400'
  },
  {
    id: '27',
    name: 'Pressure Cooker Chili',
    description: 'Hearty beef and bean chili made quickly in a pressure cooker.',
    ingredients: ['ground beef', 'kidney beans', 'canned tomatoes', 'onions', 'bell peppers', 'garlic'],
    method: 'Pressure Cooking',
    time: 35,
    tags: ['Comfort Food', 'Mexican', 'Spicy'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400'
  },
  {
    id: '28',
    name: 'Mediterranean Salad',
    description: 'Fresh and vibrant salad with feta, olives, and crisp vegetables.',
    ingredients: ['romaine lettuce', 'cucumber', 'tomatoes', 'feta cheese', 'olive oil', 'oregano'],
    method: 'Raw/No Cook',
    time: 10,
    tags: ['Healthy', 'Quick', 'Vegetarian'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400'
  },
  {
    id: '29',
    name: 'Pesto Pasta',
    description: 'Fresh basil pesto tossed with penne pasta and pine nuts.',
    ingredients: ['penne pasta', 'fresh basil', 'pine nuts', 'parmesan', 'garlic', 'olive oil'],
    method: 'Boiling',
    time: 15,
    tags: ['Italian', 'Quick', 'Vegetarian'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400'
  },
  {
    id: '30',
    name: 'Honey Garlic Salmon',
    description: 'Oven-baked salmon glazed with sweet honey garlic sauce.',
    ingredients: ['salmon fillets', 'honey', 'garlic', 'soy sauce', 'lemons', 'rice'],
    method: 'Baking',
    time: 25,
    tags: ['Seafood', 'Healthy', 'Quick'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400'
  },
  // ============================================================
  // Melbourne-style recipes (IDs 31-80)
  // ============================================================
  {
    id: '31',
    name: 'Smashed Avo on Sourdough',
    description: 'The iconic Melbourne brunch — creamy avocado on toasted sourdough with a poached egg.',
    ingredients: ['avocado', 'sourdough bread', 'eggs', 'lemon', 'cherry tomatoes', 'chili flakes'],
    method: 'Raw/No Cook',
    time: 10,
    tags: ['Brunch', 'Quick', 'Healthy'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400'
  },
  {
    id: '32',
    name: 'Eggs Benedict',
    description: 'Poached eggs on English muffins with hollandaise sauce and smoked salmon.',
    ingredients: ['eggs', 'butter', 'lemon', 'salmon fillet', 'spinach'],
    method: 'Boiling',
    time: 20,
    tags: ['Brunch', 'Classic', 'Social'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1608039829572-9b5bba1ee185?w=400'
  },
  {
    id: '33',
    name: 'Bircher Muesli',
    description: 'Overnight oats soaked in yoghurt with fresh fruit and honey — a Melbourne café staple.',
    ingredients: ['oats', 'milk', 'honey', 'lemon', 'blueberries'],
    method: 'Raw/No Cook',
    time: 10,
    tags: ['Brunch', 'Healthy', 'Quick'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400'
  },
  {
    id: '34',
    name: 'Shakshuka',
    description: 'Eggs poached in a spiced tomato and pepper sauce — perfect for brunch or dinner.',
    ingredients: ['eggs', 'tomatoes', 'bell peppers', 'onion', 'garlic', 'cumin'],
    method: 'Frying',
    time: 25,
    tags: ['Brunch', 'Middle Eastern', 'Vegetarian'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=400'
  },
  {
    id: '35',
    name: 'Ricotta Hotcakes',
    description: 'Fluffy ricotta pancakes with honey, berries and a dusting of icing sugar.',
    ingredients: ['eggs', 'milk', 'butter', 'ricotta', 'honey', 'blueberries'],
    method: 'Frying',
    time: 20,
    tags: ['Brunch', 'Sweet', 'Social'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400'
  },
  {
    id: '36',
    name: 'Chicken Pho',
    description: 'Aromatic Vietnamese noodle soup with tender chicken and fresh herbs.',
    ingredients: ['chicken breast', 'onion', 'garlic', 'rice noodles', 'ginger', 'lime'],
    method: 'Boiling',
    time: 45,
    tags: ['Vietnamese', 'Asian', 'Comfort Food'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400'
  },
  {
    id: '37',
    name: 'Chicken Laksa',
    description: 'Rich and spicy coconut curry noodle soup — a Melbourne favourite.',
    ingredients: ['chicken breast', 'coconut milk', 'rice noodles', 'garlic', 'onion', 'lime'],
    method: 'Boiling',
    time: 35,
    tags: ['Malaysian', 'Asian', 'Spicy'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400'
  },
  {
    id: '38',
    name: 'Pad See Ew',
    description: 'Stir-fried flat noodles with chicken, broccoli and sweet soy sauce.',
    ingredients: ['chicken breast', 'broccoli', 'soy sauce', 'eggs', 'garlic'],
    method: 'Stir-Frying',
    time: 20,
    tags: ['Thai', 'Asian', 'Quick'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400'
  },
  {
    id: '39',
    name: 'Vietnamese Banh Mi',
    description: 'Crusty roll filled with marinated chicken, pickled carrots, cucumber and chilli.',
    ingredients: ['chicken thighs', 'carrots', 'cucumber', 'garlic', 'soy sauce', 'lemon'],
    method: 'Baking',
    time: 30,
    tags: ['Vietnamese', 'Quick', 'Lunch'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1600688640154-9619e002df30?w=400'
  },
  {
    id: '40',
    name: 'Thai Papaya Salad',
    description: 'Zesty and crunchy green papaya salad with a sweet-sour-spicy dressing.',
    ingredients: ['carrots', 'tomatoes', 'garlic', 'lemon', 'chili', 'peanuts'],
    method: 'Raw/No Cook',
    time: 15,
    tags: ['Thai', 'Healthy', 'Quick'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400'
  },
  {
    id: '41',
    name: 'Nasi Goreng',
    description: 'Indonesian fried rice with chicken, egg and sweet soy sauce.',
    ingredients: ['rice', 'chicken breast', 'eggs', 'soy sauce', 'garlic', 'onion'],
    method: 'Frying',
    time: 25,
    tags: ['Indonesian', 'Asian', 'Quick'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400'
  },
  {
    id: '42',
    name: 'Tom Yum Soup',
    description: 'Hot and sour Thai soup with prawns, mushrooms and fragrant lemongrass.',
    ingredients: ['shrimp', 'mushrooms', 'garlic', 'onion', 'lime', 'chili'],
    method: 'Boiling',
    time: 30,
    tags: ['Thai', 'Asian', 'Spicy'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400'
  },
  {
    id: '43',
    name: 'Satay Chicken Skewers',
    description: 'Grilled chicken skewers with creamy peanut satay sauce.',
    ingredients: ['chicken breast', 'garlic', 'lemon', 'soy sauce', 'honey'],
    method: 'Grilling',
    time: 30,
    tags: ['Indonesian', 'Asian', 'Social'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=400'
  },
  {
    id: '44',
    name: 'Chicken Souvlaki',
    description: 'Greek-style grilled chicken skewers with lemon, garlic and oregano.',
    ingredients: ['chicken breast', 'lemon', 'garlic', 'oregano', 'olive oil'],
    method: 'Grilling',
    time: 25,
    tags: ['Greek', 'Mediterranean', 'Social'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400'
  },
  {
    id: '45',
    name: 'Greek Lamb Kebabs',
    description: 'Tender lamb pieces grilled with capsicum, onion and a squeeze of lemon.',
    ingredients: ['lamb', 'bell peppers', 'onion', 'oregano', 'lemon', 'garlic'],
    method: 'Grilling',
    time: 30,
    tags: ['Greek', 'Social', 'Protein'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400'
  },
  {
    id: '46',
    name: 'Spanakopita',
    description: 'Crispy Greek filo pastry filled with spinach, feta and herbs.',
    ingredients: ['spinach', 'feta cheese', 'eggs', 'butter', 'onion', 'garlic'],
    method: 'Baking',
    time: 45,
    tags: ['Greek', 'Vegetarian', 'Social'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400'
  },
  {
    id: '47',
    name: 'Moussaka',
    description: 'Layers of eggplant, spiced beef and creamy béchamel sauce — Greek comfort food.',
    ingredients: ['eggplant', 'ground beef', 'tomatoes', 'onion', 'garlic', 'milk'],
    method: 'Baking',
    time: 60,
    tags: ['Greek', 'Comfort Food', 'Family'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400'
  },
  {
    id: '48',
    name: 'Greek Salad Wrap',
    description: 'Fresh wrap with cucumber, tomato, feta, olives and a drizzle of olive oil.',
    ingredients: ['cucumber', 'tomatoes', 'feta cheese', 'oregano', 'olive oil', 'onion'],
    method: 'Raw/No Cook',
    time: 10,
    tags: ['Greek', 'Quick', 'Healthy'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400'
  },
  {
    id: '49',
    name: 'Chicken Katsu Curry',
    description: 'Crispy breaded chicken with Japanese curry sauce over steamed rice.',
    ingredients: ['chicken breast', 'eggs', 'breadcrumbs', 'rice', 'curry powder', 'onion', 'carrots'],
    method: 'Frying',
    time: 35,
    tags: ['Japanese', 'Asian', 'Comfort Food'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400'
  },
  {
    id: '50',
    name: 'Miso Ramen',
    description: 'Rich miso broth with tender chicken, ramen noodles, egg and bok choy.',
    ingredients: ['eggs', 'chicken breast', 'garlic', 'mushrooms', 'bok choy', 'soy sauce'],
    method: 'Boiling',
    time: 40,
    tags: ['Japanese', 'Asian', 'Comfort Food'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400'
  },
  {
    id: '51',
    name: 'Teriyaki Sushi Bowl',
    description: 'Deconstructed sushi with teriyaki salmon, rice, cucumber and avocado.',
    ingredients: ['rice', 'salmon fillets', 'cucumber', 'soy sauce', 'eggs', 'avocado'],
    method: 'Boiling',
    time: 30,
    tags: ['Japanese', 'Healthy', 'Quick'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
  },
  {
    id: '52',
    name: 'Bibimbap',
    description: 'Korean rice bowl with sautéed vegetables, egg and spicy gochujang sauce.',
    ingredients: ['rice', 'eggs', 'carrots', 'broccoli', 'soy sauce', 'garlic'],
    method: 'Frying',
    time: 30,
    tags: ['Korean', 'Asian', 'Healthy'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400'
  },
  {
    id: '53',
    name: 'Korean Fried Chicken',
    description: 'Double-fried crispy chicken tossed in a sweet-spicy gochujang glaze.',
    ingredients: ['chicken breast', 'soy sauce', 'garlic', 'honey', 'eggs'],
    method: 'Frying',
    time: 35,
    tags: ['Korean', 'Asian', 'Social'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=400'
  },
  {
    id: '54',
    name: 'Miso Glazed Eggplant',
    description: 'Tender roasted eggplant with a caramelised sweet miso glaze.',
    ingredients: ['eggplant', 'soy sauce', 'garlic', 'honey', 'sesame seeds'],
    method: 'Baking',
    time: 30,
    tags: ['Japanese', 'Vegetarian', 'Healthy'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400'
  },
  {
    id: '55',
    name: 'Falafel Bowl',
    description: 'Crispy falafel balls with fresh salad, hummus and tahini dressing.',
    ingredients: ['chickpeas', 'garlic', 'onion', 'parsley', 'romaine lettuce', 'cucumber'],
    method: 'Frying',
    time: 30,
    tags: ['Middle Eastern', 'Vegetarian', 'Healthy'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400'
  },
  {
    id: '56',
    name: 'Lamb Kofta',
    description: 'Spiced lamb mince skewers grilled and served with yoghurt and flatbread.',
    ingredients: ['lamb', 'onion', 'garlic', 'oregano', 'cumin'],
    method: 'Grilling',
    time: 25,
    tags: ['Middle Eastern', 'Social', 'Protein'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400'
  },
  {
    id: '57',
    name: 'Hummus & Flatbread',
    description: 'Smooth homemade hummus with warm flatbread and a drizzle of olive oil.',
    ingredients: ['chickpeas', 'garlic', 'lemon', 'olive oil', 'cumin'],
    method: 'Raw/No Cook',
    time: 15,
    tags: ['Middle Eastern', 'Vegetarian', 'Quick'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1571195027468-501d3e800896?w=400'
  },
  {
    id: '58',
    name: 'Chicken Shawarma',
    description: 'Marinated chicken roasted with warm spices, served in flatbread with salad.',
    ingredients: ['chicken thighs', 'garlic', 'lemon', 'oregano', 'cumin', 'onion'],
    method: 'Roasting',
    time: 45,
    tags: ['Middle Eastern', 'Social', 'Protein'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400'
  },
  {
    id: '59',
    name: 'Lamb Tagine',
    description: 'Slow-cooked lamb with vegetables, warm spices and preserved lemon.',
    ingredients: ['lamb', 'onion', 'carrots', 'potatoes', 'canned tomatoes', 'garlic', 'cumin'],
    method: 'Slow Cooking',
    time: 90,
    tags: ['Middle Eastern', 'Comfort Food', 'Winter'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400'
  },
  {
    id: '60',
    name: 'Chicken Parmi',
    description: 'The classic Aussie pub parmi — crumbed chicken with Napoli sauce and melted cheese.',
    ingredients: ['chicken breast', 'eggs', 'breadcrumbs', 'mozzarella', 'canned tomatoes', 'garlic'],
    method: 'Frying',
    time: 30,
    tags: ['Australian', 'Pub', 'Social'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400'
  },
  {
    id: '61',
    name: 'Barramundi & Chips',
    description: 'Pan-seared barramundi with thick-cut chips and lemon wedge.',
    ingredients: ['barramundi', 'potatoes', 'lemon', 'garlic', 'parsley'],
    method: 'Frying',
    time: 35,
    tags: ['Australian', 'Seafood', 'Classic'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400'
  },
  {
    id: '62',
    name: 'Classic Lamb Roast',
    description: 'Slow-roasted lamb leg with roasted vegetables — perfect for Sunday lunch.',
    ingredients: ['lamb', 'potatoes', 'carrots', 'garlic', 'onion', 'rosemary'],
    method: 'Roasting',
    time: 90,
    tags: ['Australian', 'Social', 'Comfort Food'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400'
  },
  {
    id: '63',
    name: 'Pavlova',
    description: 'Light and crispy meringue topped with whipped cream and fresh berries.',
    ingredients: ['eggs', 'heavy cream', 'lemon', 'strawberries', 'blueberries'],
    method: 'Baking',
    time: 90,
    tags: ['Australian', 'Dessert', 'Social'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=400'
  },
  {
    id: '64',
    name: 'Toasted Cheese Sandwich',
    description: 'Golden, crispy and gooey — the ultimate comfort toastie with a Melbourne twist.',
    ingredients: ['sourdough bread', 'mozzarella', 'butter', 'tomatoes'],
    method: 'Frying',
    time: 10,
    tags: ['Quick', 'Comfort Food', 'Snack'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400'
  },
  {
    id: '65',
    name: 'Pumpkin Soup',
    description: 'Velvety roasted pumpkin soup with a swirl of cream — a winter warmer.',
    ingredients: ['pumpkin', 'onion', 'garlic', 'butter', 'heavy cream', 'potatoes'],
    method: 'Boiling',
    time: 30,
    tags: ['Australian', 'Vegetarian', 'Comfort Food'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400'
  },
  {
    id: '66',
    name: 'Mac & Cheese',
    description: 'Creamy baked macaroni cheese with a golden breadcrumb topping.',
    ingredients: ['penne pasta', 'butter', 'parmesan', 'heavy cream', 'eggs', 'breadcrumbs'],
    method: 'Baking',
    time: 25,
    tags: ['Comfort Food', 'Vegetarian', 'Family'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=400'
  },
  {
    id: '67',
    name: 'Bangers & Mash',
    description: 'Juicy sausages on creamy mashed potatoes with caramelised onion gravy.',
    ingredients: ['potatoes', 'butter', 'onion', 'milk', 'garlic'],
    method: 'Frying',
    time: 25,
    tags: ['British', 'Comfort Food', 'Quick'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400'
  },
  {
    id: '68',
    name: 'Chicken Schnitzel',
    description: 'Crumbed and pan-fried chicken breast — an Aussie pub classic.',
    ingredients: ['chicken breast', 'eggs', 'breadcrumbs', 'lemon', 'garlic'],
    method: 'Frying',
    time: 20,
    tags: ['Australian', 'Pub', 'Quick'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400'
  },
  {
    id: '69',
    name: 'Loaded Nachos',
    description: 'Crispy tortilla chips loaded with spiced beef, cheese, salsa and guacamole.',
    ingredients: ['ground beef', 'tomatoes', 'onion', 'bell peppers', 'tortillas'],
    method: 'Baking',
    time: 25,
    tags: ['Mexican', 'Social', 'Comfort Food'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400'
  },
  {
    id: '70',
    name: 'Fish Tacos',
    description: 'Beer-battered fish in soft tortillas with slaw and lime crema.',
    ingredients: ['white fish', 'tortillas', 'cabbage', 'lemon', 'garlic'],
    method: 'Frying',
    time: 20,
    tags: ['Mexican', 'Seafood', 'Quick'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400'
  },
  {
    id: '71',
    name: 'Gnocchi Bolognese',
    description: 'Soft potato gnocchi with a rich slow-cooked beef bolognese sauce.',
    ingredients: ['gnocchi', 'ground beef', 'canned tomatoes', 'onion', 'garlic', 'parmesan'],
    method: 'Boiling',
    time: 35,
    tags: ['Italian', 'Comfort Food', 'Family'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400'
  },
  {
    id: '72',
    name: 'Fettuccine Alfredo',
    description: 'Silky pasta tossed in a rich parmesan cream sauce.',
    ingredients: ['penne pasta', 'butter', 'parmesan', 'heavy cream', 'garlic'],
    method: 'Boiling',
    time: 20,
    tags: ['Italian', 'Vegetarian', 'Quick'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400'
  },
  {
    id: '73',
    name: 'Caprese Salad',
    description: 'Simple Italian salad with fresh tomato, mozzarella and basil.',
    ingredients: ['tomatoes', 'mozzarella', 'fresh basil', 'olive oil'],
    method: 'Raw/No Cook',
    time: 10,
    tags: ['Italian', 'Healthy', 'Quick'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1608039829572-9b5bba1ee185?w=400'
  },
  {
    id: '74',
    name: 'Tiramisu',
    description: 'Classic Italian coffee dessert with mascarpone cream and cocoa.',
    ingredients: ['eggs', 'mascarpone', 'espresso', 'ladyfingers', 'cocoa powder'],
    method: 'Raw/No Cook',
    time: 30,
    tags: ['Italian', 'Dessert', 'Social'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400'
  },
  {
    id: '75',
    name: 'Mushroom Risotto',
    description: 'Creamy arborio rice with wild mushrooms, white wine and parmesan.',
    ingredients: ['arborio rice', 'mushrooms', 'onion', 'butter', 'parmesan', 'white wine'],
    method: 'Boiling',
    time: 40,
    tags: ['Italian', 'Vegetarian', 'Comfort Food'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400'
  },
  {
    id: '76',
    name: 'Garlic Prawns Pasta',
    description: 'Succulent prawns tossed through spaghetti with garlic butter and chilli.',
    ingredients: ['shrimp', 'spaghetti', 'garlic', 'butter', 'lemon', 'parsley'],
    method: 'Frying',
    time: 20,
    tags: ['Italian', 'Seafood', 'Quick'],
    isSaved: false,
    mealType: 'social',
    imageUrl: 'https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=400'
  },
  {
    id: '77',
    name: 'Chicken Fried Rice',
    description: 'Quick weeknight fried rice with chicken, vegetables and soy sauce.',
    ingredients: ['rice', 'chicken breast', 'eggs', 'soy sauce', 'peas', 'carrots'],
    method: 'Frying',
    time: 15,
    tags: ['Asian', 'Quick', 'Family'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400'
  },
  {
    id: '78',
    name: 'Roast Veggie Salad',
    description: 'Warm roasted vegetables with feta, rocket and balsamic dressing.',
    ingredients: ['eggplant', 'zucchini', 'bell peppers', 'feta cheese', 'onion', 'olive oil'],
    method: 'Roasting',
    time: 35,
    tags: ['Mediterranean', 'Vegetarian', 'Healthy'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400'
  },
  {
    id: '79',
    name: 'Leek & Potato Soup',
    description: 'A classic creamy soup with leeks, potato and a hint of garlic.',
    ingredients: ['leeks', 'potatoes', 'onion', 'butter', 'heavy cream', 'garlic'],
    method: 'Boiling',
    time: 30,
    tags: ['French', 'Vegetarian', 'Comfort Food'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400'
  },
  {
    id: '80',
    name: 'Honey Soy Chicken',
    description: 'Sticky honey soy glazed chicken thighs baked to perfection with rice.',
    ingredients: ['chicken thighs', 'honey', 'soy sauce', 'garlic', 'rice', 'onion'],
    method: 'Baking',
    time: 40,
    tags: ['Asian', 'Family', 'Comfort Food'],
    isSaved: false,
    mealType: 'daily',
    imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400'
  }
];

// --- Recipe "API" functions ---
// These simulate backend calls. When connecting to a real API,
// replace the logic inside these functions with fetch() calls.

export const getRecipeById = (id: string): Recipe | undefined => {
  // TODO: Replace with GET /api/recipes/:id
  return recipes.find(recipe => recipe.id === id);
};

export const getSavedRecipes = (): Recipe[] => {
  // TODO: Replace with GET /api/recipes?saved=true
  return recipes.filter(recipe => recipe.isSaved);
};

export const toggleRecipeSaved = (id: string): boolean => {
  // TODO: Replace with PATCH /api/recipes/:id { isSaved: toggle }
  const recipe = recipes.find(r => r.id === id);
  if (recipe) {
    recipe.isSaved = !recipe.isSaved;
    return recipe.isSaved;
  }
  return false;
};

export const filterRecipes = (
  ingredients: string[],
  methods: string[],
  timeMax: number,
  mealType: 'daily' | 'social'
): Recipe[] => {
  // TODO: Replace with GET /api/recipes?ingredients=...&methods=...&timeMax=...&mealType=...
  return recipes.filter(recipe => {
    // Match if ANY selected ingredient is in recipe (OR logic)
    const hasIngredients = ingredients.length === 0 ||
      ingredients.some(ing => 
        recipe.ingredients.some(ri => 
          ri.toLowerCase().includes(ing.toLowerCase())
        )
      );
    
    // Match if recipe method is in ANY selected method (OR logic)
    const matchesMethod = methods.length === 0 || 
      methods.includes(recipe.method);
    
    // Time matching: show recipes UNDER the selected time.
    // 20 → time <= 20, 40 → time <= 40, 60 → time <= 60, 80+ → all recipes
    const matchesTime = timeMax >= 80
      ? true
      : recipe.time <= timeMax;
    
    // Meal type matching
    const matchesMealType = recipe.mealType === mealType;

    return hasIngredients && matchesMethod && matchesTime && matchesMealType;
  });
};