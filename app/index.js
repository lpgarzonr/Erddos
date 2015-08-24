// [Author, [Author]] - Representation of the author relations graph. 
var authoringRelationGraph = [];

/**
 * Constructor of an Author.
 * @param {string} firstName - The Authors first name.
 * @param {string} lastName - The Authors last name.
 */
function Author(firstName, lastName){
	this.firstName = firstName;
	this.lastName = lastName;
	this.erdosNumber = -1;
	this.isVisited = false;
};

/**
 * Constructor of a Paper.
 * @param {string} title - The Papers title.
 * @param [Author] authors - An array with the Authors of the paper.
 */
function Paper(title, autors){
	this.title = title;
	this.authors = autors;
};

/**
 * Paper list builder.
 * @return [Paper, [Author]] papers - The Papers list.
 */
function buildInputPaperList(){
	var erdos = new Author('Paul', 'Erdos');
	var papers = [
		new Paper('Towards a component based GA', 
		[new Author('Leidy P', 'Garzon'), new Author('Sergio', 'Rojas-Galeano'), new Author('Henry', 'Diosa')]),
		new Paper('Estimation of relevant variables on high-dimensional biological patterns using iterated weighted kernel functions', 
		[new Author('Sergio', 'Rojas-Galeano'), new Author('Dan', 'Agranoff'), new Author('Sanjeev', 'Krishna')]),
		new Paper('The love of math', 
		[new Author('Sergio', 'Rojas-Galeano'), erdos, new Author('Elisa', 'Rodriguez')])];
	return papers;
};

/**
 * Determine if two given authors have the same atributes values.
 * @param {Author} authorBase.
 * @param {Author} authorCompare.
 */
function areEqual(authorBase, authorCompare){
	if (authorBase.firstName == authorCompare.firstName && authorBase.lastName == authorCompare.lastName ) {
	    return true;
	}
	return false;
};

/**
 * Build a relation graph from given papers.
 * @param [Paper] papers -  List of papers from which the aruthor graph will be created.
 */
function buildAuthoringRelationGraph(papers){
	var authorsList = papers.map(function(paper){
		var authors = paper.authors;
		var authorPartnerList = [];
		authors.forEach(function(author){
		authorPartnerList = getAuthorPartnerList(author)|| [] ;
			authors.forEach(function(authorPartner){
				if (!areEqual(author,authorPartner)){
					authorPartnerList.push(authorPartner);
				}
			})
			authoringRelationGraph.push([author, authorPartnerList]);
		})
	});
};

function getAuthorPartnerList(author){
		for (var i = 0; i< authoringRelationGraph.length; i++){
			if (areEqual(author, authoringRelationGraph[i][0])){
				var authorPartnerList = authoringRelationGraph[i][1];
				authoringRelationGraph.splice(i, 1);
				return authorPartnerList;
			}
		}
};

/**
 * Compute the erdos number for each author in the authoringRelationGraph starting from an author in a given index.
 * @param {number} authorIndex - index of the author from which the distance will be calculated.
 * @return {number} n - erdos number to be assing.
 */
function computeErdosNumber(authorIndex, n){
		if (authoringRelationGraph[authorIndex][0].isVisited){			
			if(authoringRelationGraph[authorIndex][0].erdosNumber > n){
				authoringRelationGraph[authorIndex][0].erdosNumber = n;
			}
		} else {
			authoringRelationGraph[authorIndex][0].isVisited = true; 
			authoringRelationGraph[authorIndex][0].erdosNumber = n; 

			for (var i = 0; i < authoringRelationGraph[authorIndex][1].length; i++){
				var newIndex = getIndexOfAuthor(authoringRelationGraph[authorIndex][1][i]);
				//TailRecursion :)
				computeErdosNumber(newIndex, authoringRelationGraph[authorIndex][0].erdosNumber + 1);
			}
		}	
};

/**
 * Provide the index of an given Author in the authoringRelationGraph.
 * @param {Author} author.
 * @return {number} index.
 */
function getIndexOfAuthor(author){
	for (var i = 0 ; i < authoringRelationGraph.length ; i++){
		if ( areEqual(author, authoringRelationGraph[i][0])){
			return i;
		}
	}
}