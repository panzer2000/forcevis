@echo off

echo Building npm
cd c:\development\forcevis
call npm run build
echo Npm build finished
setlocal

REM Set the name of the S3 bucket you want to upload to
set S3_BUCKET_NAME=skforcegraph

REM Set the path of the folder you want to upload
set FOLDER_PATH=C:\development\forcevis\build

REM Set the AWS region you want to use
set AWS_REGION=ap-southeast-2

echo Uploading to S3://skforcegraph 

REM Call the AWS CLI to upload the folder to S3
aws s3 cp "%FOLDER_PATH%" "s3://%S3_BUCKET_NAME%/" --recursive --profile "%AWS_PROFILE%" --region "%AWS_REGION%"

REM Check if the upload was successful
if %ERRORLEVEL% EQU 0 (
    echo Folder upload successful!
) else (
    echo Folder upload failed.
)

endlocal
