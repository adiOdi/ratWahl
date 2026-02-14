// Define the categories and candidates for the voting system
let categories = ["Graz", "Wien", "Male", "Female", "City", "Land"];
let candidates = ["x0", "x1", "x2", "x3", "x4", "x5", "x6"];

// Initialize arrays to store candidate scores and category weights
/**
 * [candidates][categories]
 */
let scores_matrix: number[][] = [[]];
let category_weights: number[] = [];
let size_rat = 3;

for (let candidate_id = 0; candidate_id < candidates.length; candidate_id++) {
  let candidate_scores = new Array(categories.length).fill(0);
  scores_matrix.push(candidate_scores);
}

// Interface for a vote object, which contains booleans for each category and candidate
interface vote {
  categories: boolean[];
  candidates: boolean[];
}

// Initialize an array to store all votes
let votes: vote[] = [];

// create a few random votes for testing purposes
for (let i = 0; i < 10; i++) {
  const random_vote: vote = {
    categories: Array(categories.length).fill(false),
    candidates: Array(candidates.length).fill(false)
  }
  for (let index = 0; index < Math.floor(Math.random() * categories.length); index++) {
    random_vote.categories[Math.floor(Math.random() * categories.length)] = true;
  }
  for (let index = 0; index < Math.floor(Math.random() * candidates.length); index++) {
    random_vote.candidates[Math.floor(Math.random() * candidates.length)] = true;
  }
}

// Function to transform votes into candidate/category score matrix
for (let vote_id = 0; vote_id < votes.length; vote_id++) {
  const vote = votes[vote_id];
  // For each vote, check if the voter belongs to a category and update scores accordingly
  for (let category_id = 0; category_id < categories.length; category_id++) {
    const belongs_to_category = vote.categories[category_id];
    if (belongs_to_category) {
      category_weights[category_id]++;
      // Increase every voted candidate's score in this category
      for (
        let candidate_id = 0;
        candidate_id < candidates.length;
        candidate_id++
      ) {
        const voted_candidate = vote.candidates[candidate_id];
        if (voted_candidate) {
          scores_matrix[candidate_id][category_id]++;
        }
      }
    }
  }
}

// Transform votes into percentages and store in candidate_relative_scores matrix
for (let candidate_id = 0; candidate_id < candidates.length; candidate_id++) {
  for (let category_id = 0; category_id < categories.length; category_id++) {
    scores_matrix[candidate_id][category_id] /= category_weights[category_id];
  }
}

// Transform weights to favour underrepresented categories
for (let category_id = 0; category_id < categories.length; category_id++) {
  category_weights[category_id] = Math.sqrt(category_weights[category_id]);
}

// Transform vote into scores
for (let candidate_id = 0; candidate_id < candidates.length; candidate_id++) {
  for (let category_id = 0; category_id < categories.length; category_id++) {
    scores_matrix[candidate_id][category_id] *= category_weights[category_id];
  }
}

/**
 * calculate the score a particular combination of candidates would have
 * @param candidate_selection an array of inexes of candidates
 */
function calculate_score(candidate_selection: number[]): number {
  let sum_of_scores = 0;
  for (let category_id = 0; category_id < categories.length; category_id++) {
    let max_score_for_this_category = 0;
    for (let candidate_index_id = 0; candidate_index_id < candidate_selection.length; candidate_index_id++) {
      const candidate_id = candidate_selection[candidate_index_id];
      if (max_score_for_this_category < scores_matrix[candidate_id][category_id]) {
        max_score_for_this_category = scores_matrix[candidate_id][category_id];
      }
    }
    sum_of_scores += max_score_for_this_category;
  }
  return sum_of_scores;
}

/**
 * next_selection() creates all selections of size size_rat when called repeatedly
 * It picks an unordered list of length size_rat, containing all indizies up to candidates.length
 * @returns the next selection or null if there are no more selections
 */
let selection: number[] = [];
function next_selection(): boolean {
  if (selection.length === 0) {
    for (let i = 0; i < size_rat; i++) {
      selection.push(i);
    }
    return true;
  }

  let found = false;
  for (let index = size_rat - 1; index >= 0; index--) {
    if (selection[index] < candidates.length - 2) {
      selection[index]++;
      for (let i = index + 1; i < size_rat; i++) {
        selection[i] = selection[i - 1] + 1;
      }
      found = true;
      break;
    }
  }

  if (!found) {
    return false;
  }
  return true;
}

function names_from_selection(selection: number[]): string {
  let names: string[] = [];
  for (let i = 0; i < selection.length; i++) {
    names.push(candidates[selection[i]]);
  }
  return names.join();
}

let max_score = -1;
let best_selection: number[] = [];
while (next_selection()) {
  const score = calculate_score(selection);
  // console.log(`Score: ${score.toFixed(2)} for selection: ${names_from_selection(selection)}`);
  if (score > max_score) {
    max_score = score;
    best_selection = [...selection];
  }
}

console.log(`Best score was ${max_score.toFixed(2)} for selection: ${names_from_selection(best_selection)}`);