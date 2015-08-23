
//TODO: All papers should have at least one outhor
//TODO: At least one paper shour include Erdos as an author

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

	function containsAuthor(arr, obj) {
	    for (var i = 0; i < arr.length; i++) {
	        if (arr[i].firstName == obj.firstName && arr[i].lastName == obj.lastName ) {
	            return true;
	        }
	    }
	    return false;
	};