function Author(firstName, lastName){
	this.firstName = firstName;
	this.lastName = lastName;
};

function Paper(title, autors){
	this.title = title;
	this.authors = autors;
};

function buildInputPaperList(){
	var papers = [
		new Paper('Towards a component based GA', 
		[new Author('Leidy P', 'Garzon'), new Author('Sergio', 'Rojas-Galeano'), new Author('Henry', 'Diosa')]),
		new Paper('Estimation of relevant variables on high-dimensional biological patterns using iterated weighted kernel functions', 
		[new Author('Sergio', 'Rojas-Galeano'), new Author('Dan', 'Agranoff'), new Author('Sanjeev', 'Krishna')]),
		new Paper('The love of math', 
		[new Author('Sergio', 'Rojas-Galeano'), new Author('Paul', 'Erdos'), new Author('Elisa', 'Rodriguez')])];
	return papers;
};

