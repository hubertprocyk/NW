## Projekt bioinformatyka strukturalna

Hubert Procyk (155645), Aleksander Okupnik (159867), Mateusz Przybysławski

## Algorytm Needlemana-Wunsch'a

Użycie:

```bash
node ./nw.js sekwencje.fasta
```

> [!IMPORTANT]
> Do uruchomienia skryptu potrzebna jest nowoczesna instalacja NodeJS

Podany plik powinien zawierać obie dopasowywane sekwencje. Program analizuje dwie pierwsze sekwencje i ignoruje resztę. Przykładowy plik wejściowy:

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

Wyniki zapisywane są do pliku `alignment.txt`. Wynik dla przykładowego pliku wygląda tak:

```
Dopasowanie sekwencja 1 i sekwencja 2:
GTCG_ACGCATTC
GTCGCACGCA_T_
```
