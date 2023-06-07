class CartsRepository{
    constructor(dao){
        this.dao=dao;
    }

    async getCarts(){
        const result = await this.dao.getCarts();
        return result;
    }

    async addCart(){
        const result = await this.dao.addCart();
        return result;
    }

    async getCartById(id){
        const result = await this.dao.getCartById(id);
        return result;
    }

    async addProductToCart(cartId,productId){
        const result = await this.dao.addProductToCart(cartId,productId);
        return result;
    }

    async deleteProduct(cartId,productId){
        const result = await this.dao.deleteProduct(cartId,productId);
        return result;
    }

    async deleteFullCart(cartId){
        const result = await this.dao.deleteFullCart(cartId);
        return result;
    }

    async updateQuantityInCart(cartId, productId,quantity){
        const result = await this.dao.updateQuantityInCart(cartId, productId,quantity);
        return result;
    }

}

export {CartsRepository};