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
