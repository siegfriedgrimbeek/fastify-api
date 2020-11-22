const fuzzyis = require('fuzzyis');

const {LinguisticVariable, Term, Rule, FIS} = fuzzyis;

const system = new FIS('Adaptive testing system');

const LEVEL = new LinguisticVariable('level', [0, 1]);

system.addOutput(LEVEL);

exports.getNextQuestionLevel = (pointsByQuestion, pointsByTest) => {

    const POINTS_PER_QUESTION = new LinguisticVariable('points per question', [0, 1]);
    const POINTS_PER_TEST = new LinguisticVariable('points per test', [0, 1]);

    system.addInput(POINTS_PER_QUESTION);
    system.addInput(POINTS_PER_TEST);

    POINTS_PER_QUESTION.addTerm(new Term('poor', 'trapeze', [0, 0, 0.3, 0.6]));
    POINTS_PER_QUESTION.addTerm(new Term('normal', 'trapeze', [0, 0.3, 0.6, 1]));
    POINTS_PER_QUESTION.addTerm(new Term('excellent', 'trapeze', [0.3, 0.6, 1, 1]));

    POINTS_PER_TEST.addTerm(new Term('poor', 'trapeze', [0, 0, 0.3, 0.6]));
    POINTS_PER_TEST.addTerm(new Term('normal', 'trapeze', [0, 0.3, 0.6, 1]));
    POINTS_PER_TEST.addTerm(new Term('excellent', 'trapeze', [0.3, 0.6, 1, 1]));

    LEVEL.addTerm(new Term('easy', 'triangle', [0, 0.3, 0.6]));
    LEVEL.addTerm(new Term('middle', 'triangle', [0.3, 0.6, 1]));
    LEVEL.addTerm(new Term('hard', 'trapeze', [0.6, 0.9, 1, 1]));

    system.rules = [
        new Rule(
            ['poor', 'poor'],
            ['easy'],
            'and'
        ),
        new Rule(
            ['normal', null],
            ['middle'],
            'and'
        ),
        new Rule(
            ['excellent', 'excellent'],
            ['hard'],
            'and'
        )
    ];

    return system.getPreciseOutput([pointsByQuestion, pointsByTest])[0]
}