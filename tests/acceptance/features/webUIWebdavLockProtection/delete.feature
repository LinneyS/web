Feature: Locks
  As a user
  I would like to be able to use locks control deletion of files and folders
  So that I can prevent files and folders being deleted while they are being used by another user

  Background:
    #do not set email, see bugs in https://github.com/owncloud/core/pull/32250#issuecomment-434615887
    Given these users have been created with default attributes and without skeleton files:
      | username       |
      | brand-new-user |
    And user "brand-new-user" has logged in using the webUI


  Scenario Outline: deleting a file in a public share of a locked folder
    Given user "brand-new-user" has created folder "simple-folder"
    And user "brand-new-user" has created file "simple-folder/lorem.txt"
    And user "brand-new-user" has locked folder "simple-folder" setting following properties
      | lockscope | <lockscope> |
    And the user has browsed to the files page
    And user "brand-new-user" has created a public link with following settings
      | path        | simple-folder                |
      | permissions | read, create, delete, update |
    When the public uses the webUI to access the last public link created by user "brand-new-user"
    And the user deletes folder "lorem.txt" using the webUI
    Then notifications should be displayed on the webUI with the text
      """
      The file "lorem.txt" is locked and cannot be deleted.
      """
    And as "brand-new-user" file "simple-folder/lorem.txt" should exist
    Examples:
      | lockscope |
      | exclusive |
      | shared    |

