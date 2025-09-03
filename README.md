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

Man kann das dann umrechnen in eine Matrix: Kandidaten/Kategorien:Prozent der Personen in dieser Kategorie die diesen Kandidaten gewählt haben

Die Kategorien sind nicht alle gleich gewichtet, wir gewichten sie nach Anzahl der Personen darin, können hier aber auch eingreifen um zB Minderheiten stärker zu vertreten

Jetzt kann man (inzwischen einfach via brute-force) alle Kombinationen bewerten, um die beste Repräsentation zu errechnen.

# Todos:

- Scorefunktion für eine Auswahl an Kandidaten entwickeln:
Gedanken Dazu: Summe von Prozenten möglich, aber Personen werden doppelt gezählt, maximale Prozent nehmen auch nicht so toll, wenn zB die 50% die von dem einen repräsentiert werden komplett andere sind als die die von einem anderen repräsentiert werden...
Vllt muss man irgendwelche Mengenoperationen machen und speichern wer mehreren Gruppen angehört oder so? Idk...
- eventuell nicht mehr brute force benötigen, dazu klingt des iwie wie Knapsack Problem/dynamic programming adjacent oder so
