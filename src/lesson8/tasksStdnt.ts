// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму. rest

export function sum(...nums: Array<any>): number {
    const sum = nums.reduce((acc, el) => acc + el, 0)
    // В return стоит "заглушка", чтоб typescript не ругался
    return sum
}


// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number, b: number, c: number): string {
    if (a + b > c && b + c > a && a + c > b) {
        if (a === b && b === c && a === c) {
            return '10'
        } else if (a === b || b === c || a === c) {
            return '01'
        } else {
            return '11'
        }
    }
    return '00'
}

// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return number.toString()
        .split('')
        .reduce((acc, el) => acc + Number(el), 0)
}


// 4. Функция принимает isEvenIndexSumGreater параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    let truSum = 0;
    let offSum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 0) {
            truSum += arr[i];
        } else {
            offSum += arr[i];
        }
    }
    return truSum > offSum;
}


// 5. Функция isSquareGreater принимает два параметра: площадь круга и
// площадь квадрата. Функция должна возвращать true если круг не будет выступать за пределы
// квадрата и false в противном случае. Центры фигур совпадают.

export function isSquareGreater(areaCr: number, areaSq: number): boolean {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return true
}


// 6. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено

export function getBanknoteList(amountOfMoney: number): Array<number> {
    let banknotes: Array<number> = [1000, 500, 100, 50, 20, 10, 5, 2, 1]
    let result:Array<number> = banknotes.reduce<number[]>((acc, el) => {
        for (;amountOfMoney >= el;) {
            acc.push(el);
            amountOfMoney = amountOfMoney - el;
        }

        return acc
    }, [])

    return result
}
