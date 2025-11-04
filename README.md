# Projekt bioinformatyka strukturalna

### Hubert Procyk, Aleksander Okupnik, Mateusz Przybysławski

### 155645, 159867

# Algorytm Needlemana-Wunsch'a

Użycie:

```bash
node ./nw.js sekwencje.fasta
```

Podany plik powinien zawierać obie dopasowywane sekwencje. Program analizuje dwie pierwsze sekwencje i ignoruje resztę. Przykładowy plik:

```
>sekwencja 1
GTCGACGCATTC
>sekwencja 2
GTCGCACGCAT
```

Punktacja dla dopasowań, różnic i przerw jest przechowywana w obiekcie `scores` na początku skryptu i można ją dowolnie modyfikować:

```js
const scores = {
  match: 1,
  mismatch: -1,
  gap: -2,
};
```

Wyniki zapisywane są do pliku alignment.txt. Wynik dla przykładowego pliku wygląda tak:

```
Dopasowanie sekwencja 1 i sekwencja 2:
GTCG_ACGCATTC
GTCGCACGCA_T_
```
