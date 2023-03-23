import { NumberCollection} from "./NumbersCollection";
import { CharactersCollection } from "./CharactersCollection";
import { LinkedList } from "./LinkedList";

function testNumberSort() {
  const numbersCollection1 = new NumberCollection([3, -3, -7, 100, 1000, 4]);
  numbersCollection1.sort();
  console.log(numbersCollection1.data);
}

function testStringSort() {
  const charactersCollection1 = new CharactersCollection('zzaCcAbKxxLLtT');
  charactersCollection1.sort();
  console.log(charactersCollection1);
}

function testLinkedListSort() {
  const linkedList = new LinkedList();
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