const Car = require("../model/carModel.js")
const Accessory = require("../model/accessoryModel.js")

const createCar = async (req, res) => {
    try {
      const { name, docId, accessoryId, image } = req.body;
  
      // Verificando se o docId é fornecido
      const doc = docId ? await Doc.findById(docId) : null;  // Verificando se o doc existe
      if (docId && !doc) {
        return res.status(400).json({ message: "Documento não encontrado." });
      }
  
      // Verificando se os acessórios existem
      if (accessoryId && accessoryId.length > 0) {
        const accessories = await Accessory.find({ _id: { $in: accessoryId } });
        if (accessories.length !== accessoryId.length) {
          return res.status(400).json({ message: "Um ou mais acessórios não foram encontrados." });
        }
      }
  
      const newCar = new Car({
        name,
        doc: doc ? doc._id : null,  // Se docId não for fornecido, usa null
        accessory: accessoryId || [],  // Se accessoryId não for fornecido, usa um array vazio
        image
      });
  
      await newCar.save();
  
      if (accessoryId && accessoryId.length > 0) {
        await Accessory.updateMany(
          { _id: { $in: accessoryId } },
          { $push: { car: newCar._id } }
        );
      }
  
      res.json({
        message: "Car created successfully!",
        car: newCar
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating car", error });
    }
  };
  

const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find().populate('doc', 'expirationDate').populate('accessory', 'name').select('name accessory image expirationDate');
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cars", error });
    }
}

const deleteCarId = async (req, res) => {
    const { id } = req.params;

    await Car.deleteOne({ _id: id })
    res.json({ message: "Car removed successfully!" })
}

const editCar = async (req, res) => {
  try {
      const { id } = req.params;  // O ID do carro a ser editado
      const { name, docId, accessoryId, image } = req.body;  // Os novos valores para nome, documento, acessórios e imagem

      // Verifica se o carro existe
      const car = await Car.findById(id);
      if (!car) {
          return res.status(404).json({ message: "Car not found" });
      }

      // Atualiza o nome do carro se fornecido
      if (name) {
          car.name = name;
      }

      // Atualiza a URL da imagem se fornecida
      if (image) {
          car.image = image;
      }

      // Atualiza o documento do carro se fornecido
      if (docId) {
          car.doc = docId;
      }

      // Atualiza os acessórios associados ao carro se fornecido
      if (accessoryId && accessoryId.length > 0) {
          // Substitui a lista de acessórios, se novos acessórios forem fornecidos
          car.accessory = accessoryId;
      }

      // Salva as alterações do carro
      await car.save();

      // Atualiza os acessórios para refletir a alteração
      if (accessoryId && accessoryId.length > 0) {
          // Adiciona o carro na lista de acessórios, se os acessórios forem atualizados
          await Accessory.updateMany(
              { _id: { $in: accessoryId } },
              { $addToSet: { car: car._id } }
          );
      }

      res.json({
          message: "Car updated successfully!",
          car
      });
  } catch (error) {
      res.status(500).json({ message: "Error updating car", error });
  }
};

module.exports = { createCar, getAllCars, deleteCarId, editCar }