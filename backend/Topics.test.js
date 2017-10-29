import Topics from './Topics';


it('should be able to add a topic', function() {
	
	let instance = new Topics();
	expect(instance.getTopics().length).toBe(0);
	instance.addTopic('Hi there.')

	expect(instance.getTopics().length).toBe(1);

	instance.addTopic('Hi there again.')

	expect(instance.getTopics().length).toBe(2);

});


it('should be able to upvote a topic', function() {
	
	let instance = new Topics();
	instance.addTopic('Hi there.')
	
	let topicId = instance.getTopics()[0].id

	instance.upvote(topicId)

	expect(instance.getTopics()[0].score).toBe(1);

});


it('should be able to downvote and upvote a topic', function() {


	let instance = new Topics();
	instance.addTopic('Hi there.')
	
	let topicId = instance.getTopics()[0].id

	instance.upvote(topicId)
	instance.upvote(topicId)
	instance.downvote(topicId)
	instance.downvote(topicId)
	instance.downvote(topicId)

	expect(instance.getTopics()[0].score).toBe(-1);
});


it('should be able to downvote and upvote a topic', function() {


	let instance = new Topics();
	instance.addTopic('Hi there.')
	instance.addTopic('Hi there again.')
	
	let firstTopicId = instance.getTopics()[0].id
	let secondTopicId = instance.getTopics()[0].id

	instance.upvote(firstTopicId)
	instance.upvote(firstTopicId)
	instance.downvote(secondTopicId)
	instance.downvote(secondTopicId)
	instance.downvote(secondTopicId)

	expect(instance.getTopics()).toMatchSnapshot();
});