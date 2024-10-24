Feature: Login
    Scenario: Valid Login
        Given I'm on the login page
        When I type my "test.pw@cucumber.com" and "test"
        Then I have a successful login
    
    Scenario: inValid Login
        Given I'm on the login page
        When I type my "test.invalid@cucumber.com" and "password"
        Then I receive an error message

