class UserService {
  getAllUsers() {
    console.log('all users')
  }

  getUserById(id: number) {
    console.log(`user ${id} is fetched`)
  }
}

class ProductService {
  getAllProducts() {
    console.log('all products')
  }

  getAllSoldProductsByUser(userId: number) {
    console.log(`user ${userId} ordered ....`)
  }
}

class OrdersFacade {
  constructor(private userService: UserService, private productService: ProductService) {
  }

  getInfoAboutUserAndUserOrders(userId: number) {
    this.userService.getUserById(userId)
    this.productService.getAllSoldProductsByUser(userId)
  }
}

const facede = new OrdersFacade(new UserService(), new ProductService())
facede.getInfoAboutUserAndUserOrders(1)
