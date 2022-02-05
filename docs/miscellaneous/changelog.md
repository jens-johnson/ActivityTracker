# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2022-02-05
### Added
- First official beta version of Activity Tracker.
- Although earlier prototypes of this application have been created and checked into source control, this marks the 
  "official" first pre-release.
- Full Expo application created with `client` and `service` layers that enable the React Native components to 
  retrieve data from Dynamo DB.
- Still very bug-filled:
  - Activity upload not working
  - No request/response validation
  - Activity selection in input form buggy