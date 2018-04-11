module.exports = {
    url: "",
    commands: [
        {
            goToCreateContact: function() {
                return this.waitForElementVisible('@add_contact_btn', 1000)
                    .click('@add_contact_btn')
            },
            getCountOfContacts: function(callback) {
                var self = this;
                this.api.elements('css selector', "#table_contacts tbody tr", function(result){
                    if (callback){
                        callback(result.value.length);
                    }
                });
                return self;
            },
            editContactByIndex: function (index) {
                var client = this.api;
                var self = this;
                client.elements('css selector', "#table_contacts tbody tr a.edit_contact", function(result){
                    client.elementIdClick(result.value[index].ELEMENT, function () {
                        return self;
                    });
                });
            },
            deleteContactByIndex: function (index) {
                var client = this.api;
                var self = this;
                client.elements('css selector', "#table_contacts tbody tr a.delete_contact", function(result){
                    client.elementIdClick(result.value[index].ELEMENT, function () {
                        client.acceptAlert(function () {
                            return self;
                        });
                    });
                });
            }
        }
    ],
    elements: {
        title: {
            selector: '.title'
        },
        add_contact_btn: {
            selector: '#add_contact'
        },
        table_contacts: {
            selector: '#table_contacts'
        }
    }
};
