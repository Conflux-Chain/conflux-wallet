/* -*- mode: groovy -*- */
// dontKillMe
// jenkins will kill any process spawned during the job
// https://wiki.jenkins.io/display/JENKINS/ProcessTreeKiller
pipeline {
  options {
    buildDiscarder logRotator(artifactDaysToKeepStr: '30', artifactNumToKeepStr: '50', daysToKeepStr: '60', numToKeepStr: '50')
    disableConcurrentBuilds()
    disableResume()
    durabilityHint 'PERFORMANCE_OPTIMIZED'
    timestamps()
  }

  agent none

  stages {
    stage('test') {
      agent {label 'bounty-backend-test-machine'}
      steps {
        script {
          sh (label: 'pre-build', script: "yarn")
        }
        script {
          sh (label: 'lint', script: "yarn lint:eslint .")
        }
      }
    }

    stage('multiple env') {
      parallel {
        stage('test env') {
          when {
            anyOf {
              branch 'dev'
              branch 'jenkins-pipeline'
            }
          }
          agent {label 'bounty-backend-test-machine'}
          steps {
            script {
              sh (label: 'pre-build', script: "yarn")
            }
            script {
              sh (label: 'build', script: "yarn build")
            }
            script {
              sh (label: 'move to nginx www', script: """
sudo rm -rf /www/wallet/conflux-wallet
sudo mkdir -p /www/wallet/conflux-wallet/
sudo cp -r build /www/wallet/conflux-wallet/
""")
            }
          }
        }

        stage('prod env') {
          when {
            allOf {
              branch 'master'
            }
          }
          agent {label 'scan-wallet-prod-machine'}
          steps {
            script {
              sh (label: 'pre-build', script: "yarn")
            }
            script {
              sh (label: 'build', script: "yarn build")
            }
            script {
              sh (label: 'move to nginx www', script: """
sudo rm -rf /www/wallet/conflux-wallet
sudo cp -r build  /www/wallet/conflux-wallet
""")
            }
          }
        }
      }
    }
  }
}