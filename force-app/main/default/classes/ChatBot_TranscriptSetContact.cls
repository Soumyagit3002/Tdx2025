public with sharing class ChatBot_TranscriptSetContact {
  public class TranscriptInput { 

    @InvocableVariable(required=true) 
    public ID routableID; 
      
	@InvocableVariable(required=true) 
    public String sFirstName; 

    @InvocableVariable(required=true) 
    public String sLastName; 

    @InvocableVariable(required=true) 
    public String sEmail; 
      
    @InvocableVariable(required=true) 
    public String sIssueDescription; 
  } 
     public class TranscriptOutput { 

    @InvocableVariable(required=true) 

    public String status;  

  } 
     @InvocableMethod(label='Find Contact and Associate to Transcript') 
	public static List<TranscriptOutput> setContactId(List<TranscriptInput> transcripts) {
      	List<LiveChatTranscript> chatTranscripts = new List<LiveChatTranscript>();
      	List<TranscriptOutput> outputs = new List<TranscriptOutput>();
      	TranscriptOutput output = new TranscriptOutput();
		for (TranscriptInput transcript : transcripts)
        {
            List<Contact> contacts = [SELECT Id FROM Contact 
                                      WHERE (FirstName = :transcript.sFirstName 
                                            AND LastName = :transcript.sLastName 
                                            AND Email = :transcript.sEmail) 
                                            OR Email = :transcript.sEmail
                                            OR hed__AlternateEmail__c = :transcript.sEmail
                                      		OR Campus_Email__c = :transcript.sEmail
                                      		OR hed__UniversityEmail__c = :transcript.sEmail
                                      LIMIT 1];
            if(!contacts.isEmpty())
            {
            String contactId = contacts[0].Id;
            LiveChatTranscript chatTranscript = new LiveChatTranscript(Id = transcript.routableID, ContactId = contactId, 
                                                                       How_can_we_help__c = transcript.sIssueDescription, 
                                                                       First_Name__c = transcript.sFirstName, Last_Name__c = transcript.sLastName  );
            chatTranscripts.add(chatTranscript);
            }
            else
            {
                LiveChatTranscript chatTranscript = new LiveChatTranscript(Id = transcript.routableID, 
                                                                       How_can_we_help__c = transcript.sIssueDescription, 
                                                                       First_Name__c = transcript.sFirstName, Last_Name__c = transcript.sLastName  );
            chatTranscripts.add(chatTranscript);
            }
        }
        update chatTranscripts;
      if(chatTranscripts.isEmpty())
      {
          output.status = 'Contact Not Found';
          outputs.add(output);
          return outputs;
      }
      else{
         output.status = 'Contact Found';
         outputs.add(output);
      	 return outputs;
      }
  } 

}