#!groovy

pipeline {
    agent any

    tools { nodejs "NodeJS 9.3.0" }

    stages {
        stage('Pre-test') {
            steps {
                sh 'make pretest'
            }
        }

        stage('Test') {
            steps {
                sh 'make test'
            }
        }

        stage('Post-test') {
            steps {
                junit 'junit.xml'
                step([
                    $class: 'CloverPublisher',
                    cloverReportDir: 'coverage',
                    cloverReportFileName: 'clover.xml',
                    healthyTarget: [methodCoverage: 70, conditionalCoverage: 80, statementCoverage: 80],   // optional, default is: method=70, conditional=80, statement=80
                    unhealthyTarget: [methodCoverage: 50, conditionalCoverage: 50, statementCoverage: 50], // optional, default is none
                    failingTarget: [methodCoverage: 0, conditionalCoverage: 0, statementCoverage: 0]       // optional, default is none
                ])
                withCredentials([string(credentialsId: 'react-three-state-checkbox-codecov', variable: 'CODECOV_TOKEN')]) {
                    sh 'make posttest'
                }
            }
        }
    }

    post {
        success {
            cleanWs()
        }
    }
}
