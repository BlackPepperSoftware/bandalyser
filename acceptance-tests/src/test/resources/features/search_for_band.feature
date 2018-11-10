Feature: Band searching

  Background:
    Given I am on the homepage

  Scenario: Successful search for band
    When I search for "Queen"
    Then the result list should contain 'Queen'
