window._snapinsSnippetSettingsFile = (function() {

    // Logs that the snippet settings file was loaded successfully
    //console.log("Snippet settings file loaded.");
    embedded_svc.settings.language =  'en-US';
    embedded_svc.snippetSettingsFile.extraPrechatInfo = 
    [{"entityFieldMaps":[{"doCreate":false,"doFind":true,"fieldName":"LastName","isExactMatch":true,"label":"Last Name"},
    {"doCreate":false,"doFind":true,"fieldName":"FirstName","isExactMatch":true,"label":"First Name"}, 
    {"doCreate":false,"doFind":false,"fieldName":"	Tell_us_how_we_can_help_you_today__c","isExactMatch":true,"label":"Tell us how we can help you today"}],
    "entityName":"Contact","saveToTranscript":"Contact","showOnCreate":true}];
    embedded_svc.snippetSettingsFile.extraPrechatFormDetails = [{
      "label":"Tell us how we can help you today", 
      "transcriptFields": ["How_can_we_help__c"]
    }];
  })();