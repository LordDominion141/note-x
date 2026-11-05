import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
    return (
        <>
        <section className="banner-section">
            <div className="banner">
                <h1>Write. Organize. Think.</h1>
            <p>The standard productivity app to advance your note taking experience.</p>
            <button className='cta-button'>
                SIGN UP FOR FREE
            </button>
            </div>

            <div className="image-section">
                <div className='first img'>
                    <Image src='/images/1791528984537_0.webp' alt='1ST IMAGE' width={360} height={400.03}/>
                </div>

                <div className='second img'>
                    <Image src='/images/1791529289348_0.webp' alt='2ND IMAGE' width={384} height={507.03}/>
                </div>

                <div className='third img'>
                    <Image src='/images/1791529305078_0.webp' alt='3RD IMAGE' width={360} height={400.03}/>
                </div>
            </div>


            <div className='idea-part'>
            <div className='idea-div'>
                <div className='inner'>
                    <h2>Looking for a genuine workspace to enhance your creativity?</h2>
                    <div className='link'>
                        <Link href='/'>TRY OUR NOTEBOOK</Link>
                    </div>
                </div>
            </div>
        </div> 
        </section>


        
        </>
    );
}
 
export default Home;