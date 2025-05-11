@isTest
private class ChatBot_TranscriptSetContactTest {

    @isTest
    static void testSetContactId() {
        // Create a LiveChatVisitor record for the LiveChatTranscript
        LiveChatVisitor testVisitor = new LiveChatVisitor(
        //    Name = 'Test Visitor'
        );
        insert testVisitor;

        // Test case 1: Contact found
        Contact testContact = new Contact(
            FirstName = 'John',
            LastName = 'Doe',
            Email = 'john.doe@example.com'
        );
        insert testContact;

        LiveChatTranscript testTranscript = new LiveChatTranscript(
            //ContactId = testContact.Id,
            LiveChatVisitorId = testVisitor.Id
        );
        insert testTranscript;

        ChatBot_TranscriptSetContact.TranscriptInput input = new ChatBot_TranscriptSetContact.TranscriptInput();
        input.routableID = testTranscript.Id;
        input.sFirstName = 'John';
        input.sLastName = 'Doe';
        input.sEmail = 'john.doe@example.com';

        List<ChatBot_TranscriptSetContact.TranscriptInput> inputs = new List<ChatBot_TranscriptSetContact.TranscriptInput>();
        inputs.add(input);

        Test.startTest();
        List<ChatBot_TranscriptSetContact.TranscriptOutput> outputs = ChatBot_TranscriptSetContact.setContactId(inputs);
        Test.stopTest();

        System.assertEquals(1, outputs.size());
        System.assertEquals('Contact Found', outputs[0].status);
	/*
        // Test case 2: Contact not found
        ChatBot_TranscriptSetContact.TranscriptInput inputNotFound = new ChatBot_TranscriptSetContact.TranscriptInput();
        inputNotFound.routableID = testTranscript.Id; // Assuming this transcript ID does not exist
        inputNotFound.sFirstName = 'Non';
        inputNotFound.sLastName = 'Existent';
        inputNotFound.sEmail = 'nonexistent@example.com';

        List<ChatBot_TranscriptSetContact.TranscriptInput> inputsNotFound = new List<ChatBot_TranscriptSetContact.TranscriptInput>();
        inputsNotFound.add(inputNotFound);

        Test.startTest();
        List<ChatBot_TranscriptSetContact.TranscriptOutput> outputsNotFound = ChatBot_TranscriptSetContact.setContactId(inputsNotFound);
        Test.stopTest();

        System.assertEquals(1, outputsNotFound.size());
        System.assertEquals('Contact Not Found', outputsNotFound[0].status);
*/
    }
}