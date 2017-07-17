const key = 'goodsList'

export function addGoods(goods){
    const goodsList = JSON.parse(localStorage.getItem(key)||'[]')
    goodsList.push(goods)
    localStorage.setItem(key,JSON.stringify(goodsList))
}