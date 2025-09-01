let categories = ["Graz", "Wien", "Male", "Female", "City", "Land"];
let candidates = ["x1", "x2", "x3", "x4", "x5", "x6"];
let candidate_absolute_scores: number[][] = [[]];
let category_weights: number[] = [];
type category = "Graz" | "Wien" | "Male" | "Female";
type candidate = "x1" | "x2" | "x3" | "x4" | "x5" | "x6";
let size_rat = 3;

interface vote {
  categories: boolean[];
  candidates: boolean[];
}

let votes: vote[] = [];

// transform votes into candidate/category score matrix:
for (let vote_id = 0; vote_id < votes.length; vote_id++) {
  const vote = votes[vote_id];
  // for each vote:
  for (let category_id = 0; category_id < categories.length; category_id++) {
    const belongs_to_category = vote.categories[category_id];
    // for each category:
    if (belongs_to_category) {
      category_weights[category_id]++;

      // increase every voted candidate's score in this category
      for (
        let candidate_id = 0;
        candidate_id < candidates.length;
        candidate_id++
      ) {
        const voted_candidate = vote.candidates[candidate_id];
        if (voted_candidate) {
          candidate_absolute_scores[candidate_id][category_id]++;
        }
      }
    }
  }
}

// transform votes into percentages
let candidate_relative_scores: number[][] = [[]];

for (let candidate_id = 0; candidate_id < candidates.length; candidate_id++) {
  const candidate = candidate_absolute_scores[candidate_id];
  for (let category_id = 0; category_id < categories.length; category_id++) {
    const element = candidate[category_id];
    candidate_relative_scores[candidate_id][category_id] =
      element / category_weights[category_id];
  }
}

// increase minimal category weights to 10% of voters
let min_weight = Math.round(votes.length / 10);

for (let category_id = 0; category_id < categories.length; category_id++) {
  const element = category_weights[category_id];
  if (element < min_weight) {
    category_weights[category_id] = min_weight;
  }
}

// calculate distances to optimal representation
let candidate_relative_distance_scores: number[][] = [[]];

for (let category_id = 0; category_id < categories.length; category_id++) {
  for (let candidate_id = 0; candidate_id < candidates.length; candidate_id++) {
    candidate_relative_distance_scores[candidate_id][category_id] =
      1 - candidate_relative_scores[candidate_id][category_id];
  }
}

function calculate_score(candidate_ids: number[]) {
  let score_sums: number[] = [];
  // sum the scores of all selected candidates for all categories
  for (
    let candidate_id_id = 0;
    candidate_id_id < candidate_ids.length;
    candidate_id_id++
  ) {
    const candidate_id = candidate_ids[candidate_id_id];
    const scores = candidate_relative_distance_scores[candidate_id];
    for (let category_id = 0; category_id < categories.length; category_id++) {
      score_sums[category_id] += scores[category_id];
    }
  }

  // sum the square of the score_sums multiplied by the category weights
  let score = 0;
  for (let category_id = 0; category_id < categories.length; category_id++) {
    score +=
      score_sums[category_id] *
      score_sums[category_id] *
      category_weights[category_id];
  }
  return score;
}

// function to generate all combinations of length n of array
function* combinationN(array: number[], n: number) {
  if (n === 1) {
    for (const a of array) {
      yield [a];
    }
    return;
  }

  for (let i = 0; i <= array.length - n; i++) {
    for (const c of combinationN(array.slice(i + 1), n - 1)) {
      yield [array[i], ...c];
    }
  }
}

// helper list to have all candidate ids in an array
let candidate_ids: number[] = [];
for (let candidate_id = 0; candidate_id < candidates.length; candidate_id++) {
  candidate_ids[candidate_id] = candidate_id;
}

// calculate score for each combination and take the best one
let min_distance: number = Infinity;
let best_combination: number[] = [];
combinationN(candidate_ids, size_rat).array.forEach(
  (candidate_ids: number[]) => {
    const distance = calculate_score(candidate_ids);
    if (distance < min_distance) {
      min_distance = distance;
      best_combination = [...candidate_ids];
    }
  }
);
