module.exports = (model) => {
  // External Dependancies
  const boom = require('boom')
  
  // Get Data Models
  let obj = {};
  obj[model] = require(`../../models/${model}`)
  
  return {
    boom: boom,
    model: obj[model],
    actions: {
      test: async (req, reply) => {
        try {
          return `${model} works`
        } catch (err) {
          throw boom.boomify(err)
        }
      },
      index: async (req, reply) => {
        try {
          const cars = await obj[model].find()
          return cars
        } catch (err) {
          throw boom.boomify(err)
        }
      },
      detail: async (req, reply) => {
        try {
          const id = req.params.id
          const car = await obj[model].findById(id)
          return car
        } catch (err) {
          throw boom.boomify(err)
        }
      },
      new: async (req, reply) => {
        try {
          const car = new Car(req.body)
          return obj[model].save()
        } catch (err) {
          throw boom.boomify(err)
        }
      },
      update: async (req, reply) => {
        try {
          const id = req.params.id
          const car = req.body
          const { ...updateData } = car
          const update = await obj[model].findByIdAndUpdate(id, updateData, { new: true })
          return update
        } catch (err) {
          throw boom.boomify(err)
        }
      },
      delete: async (req, reply) => {
        try {
          const id = req.params.id
          const car = await obj[model].findByIdAndRemove(id)
          return car
        } catch (err) {
          throw boom.boomify(err)
        }
      }
    }
  }
}
