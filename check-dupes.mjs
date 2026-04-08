import { products } from './src/data/products.ts';
const ids = products.map(p => p.id);
const dupes = ids.filter((item, index) => ids.indexOf(item) !== index);
if (dupes.length) {
  console.error('Duplicates found:', dupes);
  process.exit(1);
} else {
  console.log('No duplicates found.');
}
