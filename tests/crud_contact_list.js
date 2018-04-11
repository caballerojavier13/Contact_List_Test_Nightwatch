describe('Contact List Tests', function() {

    describe('CRUD Contacts', function() {

        var random_number =  Date.now();
        
        var base_url = "";

        before(function(client, done) {
            base_url = client.globals.test_settings.globals.baseUrl();
            done();
        });

        after(function(client, done) {
            client.end(function() {
                done();
            });
        });

        afterEach(function(client, done) {
            done();
        });

        beforeEach(function(client, done) {
            client.maximizeWindow();
            done();
        });

        it('Validate Home Page', function(client) {

            var page_index = client.page.contact_index();
            
            client.url(base_url);

            page_index
                .waitForElementVisible('@title', 2000)
                .assert.visible('@title')
                .assert.containsText('@title', 'Contact List', 'Checking title text')
                .assert.elementNotPresent('@table_contacts')
                .getCountOfContacts(function (result) {
                    client.assert.equal(result, 0, "Checking count of Contacts");
                });

        });

        it('Create a Contact', function(client) {

            var page_index = client.page.contact_index();

            client.url(base_url);

            page_index
                .waitForElementVisible('@title', 2000)
                .goToCreateContact();

            var page_create = client.page.contact_create();

            page_create
                .waitForElementVisible('@first_name_input', 2000)
                .assert.containsText('@title', 'New Contact', 'Checking title text');

            page_create.setValue('@first_name_input', "Javier" + random_number)
                .setValue('@last_name_input', "Caballero" + random_number)
                .setValue('@email_input', 'javier' + random_number + '@caballero.com')
                .setValue('@mobile_input', '+549 9877665544')
                .click('@save_btn');

            var page_show = client.page.contact_show();

            page_show
                .waitForElementVisible('@title', 2000)
                .assert.containsText('@title', 'View Contact', 'Checking title text');

            client.url(base_url);

            page_index
                .waitForElementVisible('@title', 2000)
                .assert.containsText('@title', 'Contact List', 'Checking title text')
                .assert.elementPresent('@table_contacts')
                .getCountOfContacts(function (result) {
                    client.assert.equal(result, 1, "Checking count of Contacts");
                });

        });

        it('Edit a Contact', function(client) {

            var page_index = client.page.contact_index();

            client.url(base_url);

            page_index
                .waitForElementVisible('@title', 2000)
                .getCountOfContacts(function (result) {
                    client.assert.equal(result, 1, "Checking count of Contacts");
                })
                .editContactByIndex(0);

            var page_edit = client.page.contact_edit();

            page_edit
                .waitForElementVisible('@first_name_input', 2000)
                .assert.containsText('@title', 'Edit Contact', 'Checking title text');

            page_edit
                .clearValue('@first_name_input')
                .setValue('@first_name_input', "Javier" + random_number + "Edited")
                .clearValue('@last_name_input')
                .setValue('@last_name_input', "Caballero" + random_number + "Edited")
                .clearValue('@email_input')
                .setValue('@email_input', 'javier' + random_number + 'Edited' + '@caballero.com')
                .clearValue('@mobile_input')
                .setValue('@mobile_input', '+549 9877665544')
                .click('@save_btn');

            var page_show = client.page.contact_show();

            page_show
                .waitForElementVisible('@title', 2000)
                .assert.containsText('@title', 'View Contact', 'Checking title text');

            client.url(base_url);

            page_index
                .getCountOfContacts(function (result) {
                    client.assert.equal(result, 1, "Checking count of Contacts");
                });

        });

        it('Delete a Contact', function(client) {

            var page_index = client.page.contact_index();

            client.url(base_url);

            page_index
                .waitForElementVisible('@title', 2000)
                .getCountOfContacts(function (result) {
                    client.assert.equal(result, 1, "Checking count of Contacts");
                })
                .deleteContactByIndex(0);

            client.pause(2 * 1000);

            page_index
                .getCountOfContacts(function (result) {
                    client.assert.equal(result, 0, "Checking count of Contacts");
                });

        });

    });

});
