"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumbersCollection_1 = require("./NumbersCollection");
const CharactersCollection_1 = require("./CharactersCollection");
const LinkedList_1 = require("./LinkedList");
function testNumberSort() {
    const numbersCollection1 = new NumbersCollection_1.NumberCollection([3, -3, -7, 100, 1000, 4]);
    numbersCollection1.sort();
    console.log(numbersCollection1.data);
}
function testStringSort() {
    const charactersCollection1 = new CharactersCollection_1.CharactersCollection('zzaCcAbKxxLLtT');
    charactersCollection1.sort();
    console.log(charactersCollection1);
}
function testLinkedListSort() {
    const linkedList = new LinkedList_1.LinkedList();
    linkedList.add(400);
    linkedList.add(-3);
    linkedList.add(-1);
    linkedList.add(11);
    linkedList.add(7);
    linkedList.sort();
    linkedList.print();
}
testNumberSort();
testStringSort();
testLinkedListSort();
