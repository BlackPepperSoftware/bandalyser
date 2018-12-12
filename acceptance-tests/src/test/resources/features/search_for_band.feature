Feature: Band searching

  Background:
    Given I am on the homepage

  Scenario: Successful search for band
    When I search for "Queen"
    Then the result list should contain 'Queen'

  Scenario: Display top tracks for a band
    When I search for "Queen"
    And I select "Queen" result
    Then I should see the following top tracks
