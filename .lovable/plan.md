

## Objective

Re-parse the Excel and fix all data discrepancies in `src/data/products.ts`. There are many errors across the entire file.

## Discrepancies Found

### Cadenas (CAD 30-36) — Data shifted by 2 positions
All data from CAD 30 onward is wrong (sizes, prices, karats are from different rows):
- **CAD 30**: should be 48CM, $8,988 (has 64CM, $50,076)
- **CAD 31**: should be 42CM, $1,712 (has 68CM, $53,821)
- **CAD 32**: should be 14K, 46CM, $9,630 (has 10k, 48CM, $8,988)
- **CAD 33**: should be 10k, 44cm, $2,996 (has 10K, 42CM, $1,712)
- **CAD 34**: should be ROSARIO FLORENTINO 10K, 48CM, $8,774 (has 14K, 46CM, $9,630)
- **CAD 35**: should be ROSARIO FLORENTINO 10K, 52CM, $4,387 (has 10k, 44cm, $2,996)
- **CAD 36**: should be CADENA BARBADA 10K, 60CM, $11,128 (has 10K, 48CM, $8,774)

### Pulsos (PUL 31)
- **PUL 31**: should be $14,124 (has $8,132)

### Anillos
- **AN 7**: should be price $10,443.20 (has null)
- **AN 47-72**: prices should use "Precio Total" (Precio 2) column but are using "Precio" (base) instead

### Dijes
- **DIJE 14**: should be price $4,494 (has null)
- **DIJE 28**: should be size 5CM, price $2,568 (has 4.5CM, $22,630 — got DIJE 29's data)

### Tiffany (TIF) — Multiple shifts
- **TIF 6**: should be $363,800 (has $124,120 — that's TIF 7's price)
- **TIF 7**: should be $124,120 (has $267,500 — wrong)
- **TIF 9**: should be $203,300 (has $1,284,000 — that's TIF 11)
- **TIF 10**: should have no size, price $96,300 (has size "7", price $160,500)
- **TIF 11**: should be $1,284,000 (has null)
- **TIF 12**: should be $160,500, size 7 (has null, no size)
- **TIF 15-16**: have prices that belong to TIF 17-18; Excel shows no price for these
- **TIF 17-23**: various price/size shifts

### Van Cleef (VCA 10-14)
- **VCA 10**: should be $28,890 (has null)
- **VCA 11**: should be $34,240 (has null)
- **VCA 12**: should be $38,520 (has null)
- **VCA 13**: should be $40,660 (has null)
- **VCA 14**: should be $28,890 (has null)

### Bulgari
- **BUL 17**: should be $224,700 (has null)
- **BUL 18**: should be $1,979,500, size 8 (has $224,700 — BUL 17's price)
- **BUL 19**: should have no price (has $1,979,500 and size 8 — BUL 18's data)
- **BUL 11**: name missing full details "ORO AMARILLO 18K DIAMANTES RUBIES"

### Relojes
- **RE 6**: Excel has correa "Oyster" (missing in code), dial is empty (code has "Tiffany" which looks wrong — RE 7 has dial "Tiffany")
- **RE 7**: Excel has dial "Tiffany" and material "Oro amarillo" (code missing material)
- **RE 10**: Excel has material "Oystersteel" (code has "2 Tonos")
- **RE 13**: Excel has correa "Oyster", dial "Negro", material "2 Tonos" (code missing all)
- **RE 21**: Excel modelo is "Big Bang One Click" (code has it, but Excel typo "Big Bnag")

### Missing product: DIJE 77
- Excel has DIJE 77 (MARIPOSA, $1,391) but products.ts stops at DIJE 76

### Bulgari count: Excel has BUL 1-19 (19 items), not 20

## Plan

### 1. Re-generate `src/data/products.ts` via Python script

Run a Python script with openpyxl that:
- Reads the new Excel file cell by cell
- Extracts the exact "Precio Total" (Precio 2) value for each product
- Uses the "Detalles" column for the product name (where available)
- Maps references to correct lote folders
- Handles all edge cases: `$-`, empty prices, `#NUM!`
- Produces the complete TypeScript array with correct data

### 2. No changes needed to Joyeria.tsx or ProductDetail.tsx

The UI components already work correctly — only the data file needs fixing.

