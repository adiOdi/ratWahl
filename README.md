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

# Idee:

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
- [ ] u30
- [ ] u50
- [ ] ü50

Von welchen Kandidaten fühlst du dich vertreten?

- [ ] Cand1
- [ ] Cand2
- [ ] Cand3
- [ ] Cand4

|       | Cat1 | Cat2 | Cat3 |
| :---: | ---- | ---- | ---- |
| Total | 170p | 10p  | 50p  |
| Cand1 | 119  |   1  |  10  |
| Cand2 |  51  |   1  |  40  |
| Cand3 |  17  |   3  |   5  |

Man kann das dann umrechnen in eine Matrix: Kandidaten/Kategorien:Prozent der Personen in dieser Kategorie die diesen Kandidaten gewählt haben:

|       | Cat1 | Cat2 | Cat3 |
| :---: | ---- | ---- | ---- |
| Total | 170p | 10p  | 50p  |
| Cand1 | 70%  | 10%  | 20%  |
| Cand2 | 30%  | 10%  | 90%  |
| Cand3 | 10%  | 30%  | 10%  |

Die Kategorien gewichten wir nun nach der Wurzel der Anzahl an Personen die sich dieser zugehörig fühlen. 

Die Wurzel macht das System fairer gegenüber Minderheiten, ohne Mehrheiten ganz außen vor zu lassen, da bei einer verdoppelung an Personen in einer Kategorie die Gewichtung um nur ca 40% statt um 100% steigt, wie das in einer klassischen Mehrheitswahl der Fall wäre.

|       | Cat1 | Cat2 | Cat3 |
| :---: | ---- | ---- | ---- |
| weight|  13  |   3  |   7  |

Wenn wir nun die Prozente mit den Gewichtungen multiplizieren erhalten wir:

|       | Cat1 | Cat2 | Cat3 |
| :---: | ---- | ---- | ---- |
| Cand1 | 91   | 3    | 14   |
| Cand2 | 39   | 3    | 57   |
| Cand3 | 13   | 9    |  7   |

Um nun die beste Kombination zu finden, rechnen wir pro mögliche Kombination für jede Kategorie den Maximalscore aus. 

In diesem Beispiel wollen wir aus den drei Kandidaten einen Rat aus zwei Personen zusammenstellen.

|       | Cat1 | Cat2 | Cat3 |  Sum |
| :---: | ---- | ---- | ---- | ---- |
|Cand1 & Cand2 | 91 |  3 | 57 | 151 |
|Cand2 & Cand3 | 39 |  9 | 57 | 105 |
|Cand1 & Cand3 | 91 |  9 | 14 | 114 |

Die Summe sagt aus, wie gut eine bestimmte Kombination die Wählenden vertritt, ohne dabei Minderheiten zu übersehen.

Wir wählen in diesm Beispiel also die Kandidaten Cand1 & Cand2 zu unserem Rat, da die Summe der scores dieser Kombination am höchsten ist.

# Todos:

- eventuell nicht mehr brute force benötigen, dazu klingt des iwie wie Knapsack Problem/dynamic programming adjacent oder so

# Transparenz:

gezeigt werden kann:

- welche Keys wie viele token vergeben haben (und wie viele verwendet wurden) - maybe bubbles network welcher key wen gesigned hat
- Die Scores für die Kandidaten (wer wen vertritt) - evtl nur für top 10 oder so - Balkendiagramm
- dieses Repo mit klarem readme, gut kommentierter, klarer Code

# Auth:

Signing keys

rootkey

kollektivkey

keys

**votelinks**

link?signed_by=x&uuid=y&token=z

signed_by kann zum vorausfüllen von Kategorien verwendet werden, um nicht soviele anzeigen zu müssen (zB Kollektivauswahl standardmäßig eingeklappt und schon ausgefüllt)

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
