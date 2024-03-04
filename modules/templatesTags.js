const replaceTemplate = (temp, pizza)=>{
    let output = temp.replace(/{% id %}/g, pizza.id);
    output = output.replace(/{% pizzaName %}/g, pizza.pizzaName);
    output = output.replace(/{% imageUrl %}/g, pizza.imageUrl);
    output = output.replace(/{% description %}/g, pizza.description);
    output = output.replace(/{% price %}/g, pizza.price);
    output = output.replace(/{% size %}/g, pizza.size);
    if (pizza.isInStock) output = output.replace(/{% isInStock %}/g, 'out-of-stock');
    return output;
}

export default  replaceTemplate;