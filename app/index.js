var authoringRelationGraph = [];

function Author(firstName, lastName, erdosNumber){
	this.firstName = firstName;
	this.lastName = lastName;
	this.erdosNumber = erdosNumber || -1;
	var setErdosNumber = function(newErdos){
		this.erdosNumber = newErdos;
	};
	this.isVisited = false;
};

function Paper(title, autors){
	this.title = title;
	this.authors = autors;
};


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


function areEqual(authorBase, authorCompare){
	if (authorBase.firstName == authorCompare.firstName && authorBase.lastName == authorCompare.lastName ) {
	    return true;
	}
	return false;
};

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
				computeErdosNumber(newIndex, authoringRelationGraph[authorIndex][0].erdosNumber + 1);
			}
		}	
};

function getIndexOfAuthor(author){
	for (var i = 0 ; i < authoringRelationGraph.length ; i++){
		if ( areEqual(author, authoringRelationGraph[i][0])){
			return i;
		}
	}
}