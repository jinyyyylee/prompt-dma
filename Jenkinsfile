pipeline {
    agent {
        kubernetes {
            inheritFrom 'buildah'
        }
    }

    environment {
        REGISTRY = 'harbor.mingi.kr'
        PROJECT = 'prompt-dma'
        IMAGE_NAME = 'frontend'
        REPOSITORY = "${REGISTRY}/${PROJECT}/${IMAGE_NAME}"

        GIT_HASH = sh(
            script: 'git rev-parse --short HEAD',
            returnStdout: true
        ).trim()
    }

    tools {
        nodejs 'node 24.11.0'
    }

    stages {
        stage('Build Nextjs') {
            steps {
                container('buildah') {
                    sh '''
                        buildah bud \
                        --isolation chroot \
                        --layers \
                        -f Dockerfile \
                        -t ${REPOSITORY} .
                    '''
                    sh "buildah tag ${REPOSITORY} ${REPOSITORY}:${GIT_HASH}"
                    sh "buildah tag ${REPOSITORY} ${REPOSITORY}:latest"
                }
            }
        }
    }
}