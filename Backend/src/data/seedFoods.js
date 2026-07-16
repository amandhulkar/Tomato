require('dotenv').config()
const mongoose = require('mongoose')
const Food = require('../models/Food')

const foods = [
  { slug: 'greek-salad', name: 'Greek salad', image: '/static/foods/food_1.png', price: 49, description: 'Food provides essential nutrients for overall health and well-being', category: 'Salad' },
  { slug: 'veg-salad', name: 'Veg salad', image: '/static/foods/food_2.png', price: 49, description: 'Food provides essential nutrients for overall health and well-being', category: 'Salad' },
  { slug: 'clover-salad', name: 'Clover Salad', image: '/static/foods/food_3.png', price: 49, description: 'Food provides essential nutrients for overall health and well-being', category: 'Salad' },
  { slug: 'chicken-salad', name: 'Chicken Salad', image: '/static/foods/food_4.png', price: 99, description: 'Food provides essential nutrients for overall health and well-being', category: 'Salad' },
  { slug: 'lasagna-rolls', name: 'Lasagna Rolls', image: '/static/foods/food_5.png', price: 99, description: 'Food provides essential nutrients for overall health and well-being', category: 'Rolls' },
  { slug: 'peri-peri-rolls', name: 'Peri Peri Rolls', image: '/static/foods/food_6.png', price: 99, description: 'Food provides essential nutrients for overall health and well-being', category: 'Rolls' },
  { slug: 'chicken-rolls', name: 'Chicken Rolls', image: '/static/foods/food_7.png', price: 99, description: 'Food provides essential nutrients for overall health and well-being', category: 'Rolls' },
  { slug: 'veg-rolls', name: 'Veg Rolls', image: '/static/foods/food_8.png', price: 99, description: 'Food provides essential nutrients for overall health and well-being', category: 'Rolls' },
  { slug: 'ripple-ice-cream', name: 'Ripple Ice Cream', image: '/static/foods/food_9.png', price: 99, description: 'Food provides essential nutrients for overall health and well-being', category: 'Deserts' },
  { slug: 'fruit-ice-cream', name: 'Fruit Ice Cream', image: '/static/foods/food_10.png', price: 99, description: 'Food provides essential nutrients for overall health and well-being', category: 'Deserts' },
  { slug: 'jar-ice-cream', name: 'Jar Ice Cream', image: '/static/foods/food_11.png', price: 99, description: 'Food provides essential nutrients for overall health and well-being', category: 'Deserts' },
  { slug: 'vanilla-ice-cream', name: 'Vanilla Ice Cream', image: '/static/foods/food_12.png', price: 99, description: 'Food provides essential nutrients for overall health and well-being', category: 'Deserts' },
  { slug: 'chicken-sandwich', name: 'Chicken Sandwich', image: '/static/foods/food_13.png', price: 99, description: 'Food provides essential nutrients for overall health and well-being', category: 'Sandwich' },
  { slug: 'vegan-sandwich', name: 'Vegan Sandwich', image: '/static/foods/food_14.png', price: 99, description: 'Food provides essential nutrients for overall health and well-being', category: 'Sandwich' },
  { slug: 'grilled-sandwich', name: 'Grilled Sandwich', image: '/static/foods/food_15.png', price: 99, description: 'Food provides essential nutrients for overall health and well-being', category: 'Sandwich' },
  { slug: 'bread-sandwich', name: 'Bread Sandwich', image: '/static/foods/food_16.png', price: 99, description: 'Food provides essential nutrients for overall health and well-being', category: 'Sandwich' },
  { slug: 'cup-cake', name: 'Cup Cake', image: '/static/foods/food_17.png', price: 109, description: 'Food provides essential nutrients for overall health and well-being', category: 'Cake' },
  { slug: 'vegan-cake', name: 'Vegan Cake', image: '/static/foods/food_18.png', price: 109, description: 'Food provides essential nutrients for overall health and well-being', category: 'Cake' },
  { slug: 'butterscotch-cake', name: 'Butterscotch Cake', image: '/static/foods/food_19.png', price: 109, description: 'Food provides essential nutrients for overall health and well-being', category: 'Cake' },
  { slug: 'sliced-cake', name: 'Sliced Cake', image: '/static/foods/food_20.png', price: 109, description: 'Food provides essential nutrients for overall health and well-being', category: 'Cake' },
  { slug: 'garlic-mushroom', name: 'Garlic Mushroom', image: '/static/foods/food_21.png', price: 119, description: 'Food provides essential nutrients for overall health and well-being', category: 'Pure Veg' },
  { slug: 'fried-cauliflower', name: 'Fried Cauliflower', image: '/static/foods/food_22.png', price: 119, description: 'Food provides essential nutrients for overall health and well-being', category: 'Pure Veg' },
  { slug: 'mix-veg-pulao', name: 'Mix Veg Pulao', image: '/static/foods/food_23.png', price: 119, description: 'Food provides essential nutrients for overall health and well-being', category: 'Pure Veg' },
  { slug: 'rice-zucchini', name: 'Rice Zucchini', image: '/static/foods/food_24.png', price: 119, description: 'Food provides essential nutrients for overall health and well-being', category: 'Pure Veg' },
  { slug: 'cheese-pasta', name: 'Cheese Pasta', image: '/static/foods/food_25.png', price: 149, description: 'Food provides essential nutrients for overall health and well-being', category: 'Pasta' },
  { slug: 'tomato-pasta', name: 'Tomato Pasta', image: '/static/foods/food_26.png', price: 149, description: 'Food provides essential nutrients for overall health and well-being', category: 'Pasta' },
  { slug: 'creamy-pasta', name: 'Creamy Pasta', image: '/static/foods/food_27.png', price: 149, description: 'Food provides essential nutrients for overall health and well-being', category: 'Pasta' },
  { slug: 'chicken-pasta', name: 'Chicken Pasta', image: '/static/foods/food_28.png', price: 149, description: 'Food provides essential nutrients for overall health and well-being', category: 'Pasta' },
  { slug: 'butter-noodles', name: 'Buttter Noodles', image: '/static/foods/food_29.png', price: 199, description: 'Food provides essential nutrients for overall health and well-being', category: 'Noodles' },
  { slug: 'veg-noodles', name: 'Veg Noodles', image: '/static/foods/food_30.png', price: 199, description: 'Food provides essential nutrients for overall health and well-being', category: 'Noodles' },
  { slug: 'somen-noodles', name: 'Somen Noodles', image: '/static/foods/food_31.png', price: 199, description: 'Food provides essential nutrients for overall health and well-being', category: 'Noodles' },
  { slug: 'cooked-noodles', name: 'Cooked Noodles', image: '/static/foods/food_32.png', price: 199, description: 'Food provides essential nutrients for overall health and well-being', category: 'Noodles' }
]

const seedFoods = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    let created = 0
    let updated = 0
    let skipped = 0

    for (const food of foods) {
      const existingBySlug = await Food.findOne({ slug: food.slug })

      if (existingBySlug) {
        skipped += 1
        continue
      }

      const existingByName = await Food.findOne({
        name: food.name,
        category: food.category,
        slug: { $exists: false }
      })

      if (existingByName) {
        existingByName.slug = food.slug
        existingByName.source = 'static'
        if (!existingByName.image || existingByName.image === food.image.replace('/static/foods/', '')) {
          existingByName.image = food.image
        }
        await existingByName.save()
        updated += 1
        continue
      }

      await Food.create({ ...food, source: 'static' })
      created += 1
    }

    console.log(`Food seed complete. Created: ${created}, updated: ${updated}, skipped: ${skipped}`)
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

seedFoods()
