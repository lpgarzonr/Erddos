
QUnit.module( "buildInputPaperArray test", {
  beforeEach: function( assert ) {
  	//arrange
  	//act
  	var papers = buildInputPaperList();
  	//assert
    assert.ok( papers.length > 0, "Non-empty paper list, success!");
  }
});
QUnit.test( "all papers should have at least one author", function( assert ) {
	//arrange
	var papers = buildInputPaperList();

	//act
	var papersWithNoAuthors = papers.filter(function(paper){
		return paper.authors.length == 0;
	});

	//assert
	assert.equal( papersWithNoAuthors, 0 );
});

QUnit.test( "At least one paper should include Paul Erdos as an author", function( assert ) {
	//arrange
	var papers = buildInputPaperList();
	var targetAuthor = new Author('Paul', 'Erdos');

	//act
	var authorsList = _.flatten(papers.map(function(paper){
		return (paper.authors);
	}));
	var isErdosInAuthorList = containsAuthor(authorsList, targetAuthor);

	//assert
	assert.equal( isErdosInAuthorList, 1);
});

QUnit.module( "Util functions tests" );

QUnit.test( "Given two equals authors the areEqual function should return true", function( assert ) {
	//arrange
	var baseAuthor = new Author('Paul', 'Erdos');
	var compareAuthor = new Author('Paul', 'Erdos');

	//act
	var result = areEqual(baseAuthor, compareAuthor);

	//assert
	assert.equal( result, true);
});

QUnit.module( "Required functions to calculate Erdos test " );

QUnit.test( "Given a list of papers, the buildAuthoringRelationGraph.length should be lower than the number of authors (TODO: Delete duplicates)", function( assert ) {
	//arrange
	var papers = buildInputPaperList();

	//act
	buildAuthoringRelationGraph(papers);
	var listOfAuthors = getListOfAuthors(papers);

	//assert
	assert.ok( listOfAuthors.length >= authoringRelationGraph.length );
});

QUnit.test( "Given a list of papers, the computeErdosNumber should assing a erdos number to each visited author at the authoringRelationGraph ", function( assert ) {
	//arrange
	var papers = buildInputPaperList();

	//act
	buildAuthoringRelationGraph(papers);
	var targetAuthor = new Author('Paul', 'Erdos');
	var erdosIndex = getIndexOfAuthor(targetAuthor);
	computeErdosNumber(erdosIndex, 0);
	var result = authoringRelationGraph.filter(function (authorNode){
		return (authorNode[0].isVisited == true && authorNode[0].erdosNumber == -1);
	});

	//assert
	assert.equal( result.length, 0);
});

QUnit.test( "Given a list of papers, the computeErdosNumber should not assing a erdos number to the no visited author nodes at the authoringRelationGraph ", function( assert ) {
	//arrange
	var papers = buildInputPaperList();

	//act
	buildAuthoringRelationGraph(papers);
	var targetAuthor = new Author('Paul', 'Erdos');
	var erdosIndex = getIndexOfAuthor(targetAuthor);
	computeErdosNumber(erdosIndex, 0);
	var result = authoringRelationGraph.filter(function (authorNode){
		return (authorNode[0].isVisited == false && authorNode[0].erdosNumber != -1);
	});

	//assert
	assert.equal( result.length, 0);
});

QUnit.test("should set the correct ErdosNumber from a given list of papers", function (assert) {
	//arrange
	var papers = [ new Paper('Title', 
		[new Author('Leidy', 'Garzon'), new Author('Paul', 'Erdos')])];
	//act
	buildAuthoringRelationGraph(papers);
	var erdosIndex = getIndexOfAuthor(new Author('Paul', 'Erdos'));
	computeErdosNumber(erdosIndex, 0);

	//assert
	assert.ok(authoringRelationGraph[0][0].erdosNumber == 1 && authoringRelationGraph[1][0].erdosNumber == 0);    
});

function getListOfAuthors(papers) {
		var authorsList = _.flatten(papers.map(function(paper){
		return (paper.authors);
	}));
		return authorsList;
}

function containsAuthor(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].firstName == obj.firstName && arr[i].lastName == obj.lastName ) {
            return true;
        }
    }
    return false;
};