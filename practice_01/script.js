// odd or even
const oddOrEven = (num) => {
    if (num % 2 === 0) console.log('Even')
    else console.log('Odd')
}

// sort an array
const arraySort = (numArr) => {
    return [...numArr].sort((a, b) => a - b)
}

// is leap year
function isLeapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return true;
    } else {
        return false;
    }
}

// divisible by 3 and 5
const divisibleByThreeAndFive = (numArr) => {
    const ans = []
    numArr.forEach(num => {
        if (num % 3 === 0 && num % 5 === 0) ans.push(num)
    })
    return ans
}

// longest name of friends
const longestName = (nameArr) => {
    const newArr = [...nameArr]
    newArr.sort((a, b) => a.length - b.length)
    return newArr[newArr.length - 1]
}

// remove duplicates
const removeDuplicates = (numArr) => [...new Set(numArr)]

// max num
const getMaxNum = (numArr) => {
    const newArr = [...numArr]
    newArr.sort((a, b) => a - b)
    return newArr[newArr.length - 1]
}

// Monthly saving of freelancer Shahed
const monthlySavings = (allPayments, livingCost) => {
    if (!Array.isArray(allPayments) || isNaN(livingCost)) return 'invalid input'

    const savings = allPayments.reduce((acc, curr) => {
        if (curr >= 3000) curr -= curr * 0.20
        return acc + curr
    }, 0)

    return savings - livingCost < 0 ? 'earn more' : savings - livingCost
}

