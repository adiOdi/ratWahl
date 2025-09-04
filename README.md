# Problemstellung:

Einen Rat wählen, der:

- Demokratisch legitimiert ist
- möglichst alle vertritt
- nicht zu groß ist
- nicht zu kompliziert für die wählenden ist

# Probleme bei alternativen viel benutzten Systemen:

- Räte können zusammengestellt werden von "oben" - undemokratisch
- bei einer Wahl die Kandidaten mit den meisten Stimmen nehmen - Minderheiten werden evtl nicht repräsentiert
- Jede Gruppe die repräsentiert werden soll bekommt Abgeordnete im Verhältnis zur Größe der Gruppe - riesen Räte kommen raus

Idee:

Wir arbeiten mit demografischen Personengruppen
Wählende Personen geben (kreuzen) zwei Dinge an:

- Welchen Gruppen sie sich zugehörig fühlen
- von welchen Kandidaten sie sich vertreten fühlen

Welchen Gruppen fühlst du dich zugehörig?

- [ ] Graz
- [ ] Linz
- [ ] Wien
- [ ] Queer
- [ ] Ländlich
- [ ] Städtisch

Von welchen Kandidaten fühlst du dich vertreten?

- [ ] Cand1
- [ ] Cand2
- [ ] Cand3
- [ ] Cand4

Man kann das dann umrechnen in eine Matrix: Kandidaten/Kategorien:Prozent der Personen in dieser Kategorie die diesen Kandidaten gewählt haben:

|       | Cat1 | Cat1 | Cat3 |
| :---: | ---- | ---- | ---- |
| Cand1 | 70%  | 10%  | 20%  |
| Cand2 | 30%  | 10%  | 90%  |
| Cand3 | 10%  | 30%  | 10%  |

Die Kategorien sind nicht alle gleich gewichtet, wir gewichten sie nach Anzahl der Personen darin, können hier aber auch eingreifen um zB Minderheiten stärker zu vertreten, indem wir eine minimum-Gewichtung einführen

| Gesamt wählende | 200 |
| :-------------: | --- |
|    davon 10%    | 20  |
|      Cand1      | 170 |
|      Cand2      | 10  |
| Cand2 angepasst | 20  |
|      Cand3      | 50  |

Jetzt kann man (inzwischen einfach via brute-force) alle Kombinationen bewerten, um die beste Repräsentation zu errechnen.

# Todos:

- Scorefunktion für eine Auswahl an Kandidaten entwickeln:
  Gedanken Dazu: Summe von Prozenten möglich, aber Personen werden doppelt gezählt, maximale Prozent nehmen auch nicht so toll, wenn zB die 50% die von dem einen repräsentiert werden komplett andere sind als die die von einem anderen repräsentiert werden...
  Vllt muss man irgendwelche Mengenoperationen machen und speichern wer mehreren Gruppen angehört oder so? Idk...
- eventuell nicht mehr brute force benötigen, dazu klingt des iwie wie Knapsack Problem/dynamic programming adjacent oder so

# Auth:

Signing keys

rootkey

kollektivkey

keys

**votelinks**

link?keyid=x&uuid=y&token=z

| keyid | password             | signed by | signature  |
| ----- | -------------------- | --------- | ---------- |
| root  | root                 | root      | hgfsakjdsa |
| graz  | horse staple battery | root      | oivudkjdkc |

if(token == hash(uuid+password[keyid])){

    used_uuids[uuid]=true

    data=data

}

| uuid | used  | data    | created by |
| ---- | ----- | ------- | ---------- |
| 0001 | true  | 0011010 | graz       |
| 0002 | false |         | wien       |
