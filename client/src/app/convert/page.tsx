'use client';  // Ensure this is at the top for client-side rendering

import { useState } from 'react';
import axios from 'axios';

export default function Convert() {
  const [ selectedFile, setSelectedFile ] = useState<File | null>( null );
  const [ conversionType, setConversionType ] = useState<string>( 'webp' ); // Default conversion type
  const [ processedFile, setProcessedFile ] = useState<string | null>( null );
  const [ rotate, setRotate ] = useState( '' );
  const [ flip, setFlip ] = useState( false );
  const [ loading, setLoading ] = useState<boolean>( false );
  const [ error, setError ] = useState( '' )

  const handleFileChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setError('')
    if ( e.target.files ) {
      const file = e.target.files[ 0 ];

      // Check if the file exists and is an image
      if ( file && file.type.startsWith( 'image/' ) ) {
        setSelectedFile( e.target.files[ 0 ] );
      } else {
        setError( 'Please upload a valid image file' );
      }
    }
  };

  const handleConversionTypeChange = ( e: React.ChangeEvent<HTMLSelectElement> ) => {
    setConversionType( e.target.value );
  };

  const handleUpload = async () => {
    if ( !selectedFile ) return;

    const formData = new FormData();
    formData.append( 'file', selectedFile );
    formData.append( 'conversionType', conversionType );
    formData.append( 'flip', String( flip ) );
    formData.append( 'rotate', rotate );

    setLoading( true );

    try {
      const response = await axios.post( 'http://localhost:3001/convert', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob', // Handle binary data (file)
      } );

      // Create a URL for the processed file
      const fileUrl = URL.createObjectURL( response.data );
      setProcessedFile( fileUrl );
    } catch ( error ) {
      console.error( 'Error converting file:', error );
      if ( error.response && error.response.status === 429 ) {
        // Handle rate limit exceeded
        setError( 'Daily limit exceeded. You can only process 5 images per day. Please try again tomorrow.' );
      } else {
        // Handle other errors
        console.error( 'Error converting file:', error );
        setError( 'An error occurred while converting the file. Please try again later.' );
      }
    } finally {
      setLoading( false );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
          File Converter
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed">
          Upload your file, choose the conversion options, and get your result instantly.
        </p>
      </header>

      <section className="w-full max-w-screen-md mx-auto bg-white p-10 rounded-lg shadow-lg border border-gray-200 my-10">
        { !selectedFile && <div className="mb-5">
          <div className="bg-gray-100 p-7 mt-4">
            <div className="border border-dashed h-32">
              {/* file upload input*/ }
              <div className="relative flex flex-col items-center justify-center h-full">
                <svg
                  className="w-8 h-8 text-gray-400 hover:text-indigo-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M18.22 19.9628C17.8703 20 17.4213 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.7157 19.5903 4.40973 19.2843 4.21799 18.908C4.12583 18.7271 4.07264 18.5226 4.04193 18.2622M18.22 19.9628C18.5007 19.9329 18.7175 19.8791 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V13M11 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M18 9V6M18 6V3M18 6H21M18 6H15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="mt-1 text-sm text-gray-600">
                  <span>Drag and drop</span> files here or{ " " }
                  <span className="text-indigo-500 hover:underline cursor-pointer">
                    select a file
                  </span>{ " " }
                  from your computer
                </p>
                <input title='helo'
                  type="file"
                  className="absolute inset-0 z-50 w-full h-full outline-none opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={ handleFileChange }
                />
              </div>
            </div>
          </div>
        </div> }

        { selectedFile && (
          <div className="flex items-center justify-between border p-2 rounded mb-5">
            <p>{ selectedFile.name }</p>
            <button
              onClick={ () => setSelectedFile( null ) }
              className="text-red-500 font-bold text-xl focus:outline-none"
              aria-label="Remove"
            >
              &times;
            </button>
          </div>
        ) }


        {/* <input
          type="file"
          accept="image/*"
          onChange={ handleFileChange }
          className="block w-full border border-gray-300 rounded-lg p-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Choose file"
        /> */}

        <select title='conversionType'
          value={ conversionType }
          onChange={ handleConversionTypeChange }
          className="block w-full border border-gray-300 rounded-lg p-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="avif">Convert to AVIF</option>
          <option value="dz">Convert to DZ</option>
          <option value="gif">Convert to GIF</option>
          <option value="heic">Convert to HEIC</option>
          <option value="heif">Convert to HEIF</option>
          <option value="j2c">Convert to J2C</option>
          <option value="j2k">Convert to J2K</option>
          <option value="jp2">Convert to JP2</option>
          <option value="jpeg">Convert to JPEG</option>
          <option value="jpe">Convert to JPE</option>
          <option value="jpg">Convert to JPG</option>
          <option value="jpx">Convert to JPX</option>
          <option value="jxl">Convert to JXL</option>
          <option value="png">Convert to PNG</option>
          <option value="raw">Convert to RAW</option>
          <option value="tif">Convert to TIF</option>
          <option value="tiff">Convert to TIFF</option>
          <option value="tile">Convert to TILE</option>
          <option value="webp">Convert to WebP</option>
        </select>

        <input
          type="number"
          value={ rotate }
          onChange={ ( e ) => setRotate( e.target.value ) }
          placeholder="Rotate Angle"
          className="block w-full border border-gray-300 rounded-lg p-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            title='hel'
            checked={ flip }
            onChange={ ( e ) => setFlip( e.target.checked ) }
            className="mr-2 h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="text-gray-700">Flip Horizontal</label>
        </div>

        <button
          onClick={ handleUpload }
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={ loading }
        >
          { loading ? 'Processing...' : 'Convert' }
        </button>

        { error && <p className='text-red-500 italic'>{ error }</p> }

        { processedFile && (
          <div className="mt-6 flex items-center justify-between border-t pt-4">
            <span className="text-lg font-semibold text-gray-800">{ `converted-file.${conversionType}` }</span>
            <a
              href={ processedFile }
              download={ `converted-file.${conversionType}` }
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Download
            </a>
          </div>
        ) }
      </section>

      <section className="bg-white w-full dark:bg-gray-100">
        <div className="w-10/12 py-8 px-4 mx-auto sm:py-16 lg:px-6">
          <p className="mb-8 font-light text-gray-500 sm:text-3xl">
            Want to convert large files without any restrictions? Sign up Now
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <a href="#" className="inline-flex bg-yellow-400 items-center justify-center px-4 py-2.5 text-base font-medium text-center text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 ">
              Get started
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
