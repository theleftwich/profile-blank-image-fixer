// profile blank image adder

//outer loop - loop through alphabetical repositories

// go to repo

	// inner loop - loop through each profile snippet

		// extract profile html

		// check for image

		// if no image

			// check out

			// edit
			
			// add blank image
			
			// save
			
			// check in
		
	// end inner loop
	
// end outer loop



////////////////////////////////////////////
//        variables
///////////////////////////////////////////

//path to blank image (local path!)

var path_to_image;
path_to_image = "C:\\imacro\\other\\profileBlank.png";

	
// set profile buckets as array  - DISABLE FOR TESTING
var profileBucketArray = ['https://caen-cms.engin.umich.edu/college/about/people/profiles/a-to-e',	
						 'https://caen-cms.engin.umich.edu/college/about/people/profiles/f-to-j',						 'https://caen-cms.engin.umich.edu/college/about/people/profiles/k-to-o',
						 'https://caen-cms.engin.umich.edu/college/about/people/profiles/p-to-t',
						 'https://caen-cms.engin.umich.edu/college/about/people/profiles/u-to-z',
						 ];

// TO TEST ON DEV - REMOVE FOR ACTUAL
// var profileBucketArray = ['https://caen-cms-dev.engin.umich.edu/training/leftwich/profile-collection']


///////////////////////////////////////////////////////
//  outer loop
//  loops through profile buckets
///////////////////////////////////////////////////////
						 
for (j=0; j<5; j++){ // outer loop, loops through all 5 contact buckets. j<1 to test one bucket
	
	var bucket = profileBucketArray[j];
	iimSet('bucket',bucket);
	   iimPlay('profile-updater/go-to-bucket.iim');
	   
	   
		///////////////////////////////////////////////////////
		//  inner loop
		//  loops through published profiles in each bucket
		///////////////////////////////////////////////////////	   	   
	
	for (i=1; i<100; i++){ // use i<[arbitrarily large number] to make sure to get all profiles. Possible to replace with a do/while (see profile-populator-experimental.js), but I haven't gotten that working yet.
		
		iimSet('i',i);
		iimSet('bucket',bucket);
		  iimPlay('profile-updater/get-profile-name.iim');
		  var name = iimGetLastExtract(); // get and store name
		
		iimSet('i',i);
		  iimPlay('profile-updater/get-profile-url.iim');
		  var url = iimGetLastExtract(); // Get and store URL of profile
		  
		
		iimSet('i',i);
		  iimPlay('profile-updater/get-snippet.iim');
		  var snippet = iimGetLastExtract(); // Get and store html snippet
		  var snippet = snippet.replace('https://caen-cms.engin.umich.edu/', ''); // truncates CMS urls to relative
		

		
			if(snippet.indexOf('#EANF#')>=0) // check to see if array is empty - i.e., there are no more snippets to get
				{
				break; // breaks loop
				}
		   
			else // if there are still snippets being extracted, do this to them
			   {
			   

			   // check for image

			   if (snippet.indexOf('<img') != -1) // check for '<img' in snippet, if yes, then do nothing
				   {
				   // do nothing
			    }
				else // if '<img' not found, add image to profile   
			       {
				   
				   // add blank image!
				   // start macro
				   var macro = "CODE:";
				   
				   
				   	// go to profile url, check out profile
					macro += 'URL GOTO=' + url + '/@@content-checkout' + '\n';
					
					// edit the profile
					macro += 'TAG POS=1 TYPE=A ATTR=TXT:Edit' + '\n';
					
					// choose blank image in upload menu
					macro += 'TAG POS=1 TYPE=INPUT:FILE FORM=* ATTR=ID:form-widgets-sm_image-input CONTENT=' + path_to_image + '\n';
					
					// run macro
					iimSet('url',url);
					iimPlay(macro);
					
					// save page
					iimPlay('common/save-page.iim');
				   
				    // check in page
					iimPlay('common/check-in.iim'); 
					
			    } // end inner else
			}  // end outer else
		





	} // end i     
} // end j




// image path: c:\imacros\other\profileBlank.png





