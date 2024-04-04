// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();

      // Ensure the new base is different from the original base
      while (newBase === this.dna[randomIndex]) {
        newBase = returnRandBase();
      }
      // Update the base at the random index
      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    compareDNA(otherAequor) {
      let identicalCount = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherAequor.dna[i]) {
          identicalCount++;
        }
      }
      const percentage = (identicalCount / this.dna.length) * 100;
      console.log(`Specimen #${this.specimenNum} and specimen #${otherAequor.specimenNum} have ${percentage}% DNA in common.`);
    },
    willLikelySurvive() {
      const countCG = this.dna.filter(base => base === 'C' || base === 'G').length;
      const percentageCG = (countCG / this.dna.length) * 100;
      return percentageCG >= 60;
    }
    }
  };

  // Array to store instances of pAequor that can survive
const survivalInstances = [];

// Number of survival instances needed
const numSurvivalInstances = 30;

// Counter for created survival instances
let survivalCount = 0;

// Generate instances until reaching the desired number of survival instances
while (survivalCount < numSurvivalInstances) {
  let specimenNum = survivalCount + 1;
  let newStrand = mockUpStrand();
  if (pAequorFactory(specimenNum, newStrand).willLikelySurvive()) {
    survivalInstances.push(pAequorFactory(specimenNum, newStrand));
    survivalCount++;
  }
};



// Test the mutate method
const sampleAequor = pAequorFactory(1, mockUpStrand());
console.log('Original DNA:', sampleAequor.dna.join(''));
console.log('Mutated DNA:', sampleAequor.mutate().join(''));


// Test the compareDNA method
const sampleAequor1 = pAequorFactory(1, mockUpStrand());
const sampleAequor2 = pAequorFactory(2, mockUpStrand());
console.log('DNA of Sample 1:', sampleAequor1.dna.join(''));
console.log('DNA of Sample 2:', sampleAequor2.dna.join(''));
sampleAequor1.compareDNA(sampleAequor2);



// Test the willLikelySurvive method
const sampleAequor3 = pAequorFactory(1, mockUpStrand());
console.log('DNA of Sample:', sampleAequor.dna.join(''));
console.log('Will likely survive:', sampleAequor.willLikelySurvive());


// Log the survival instances for further study
console.log(survivalInstances);


















