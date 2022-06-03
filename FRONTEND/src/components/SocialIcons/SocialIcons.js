import UseAnimations from "react-useanimations";
import twitter from "react-useanimations/lib/twitter";
import facebook from "react-useanimations/lib/facebook";
import linkedin from "react-useanimations/lib/linkedin";
function SocialIcons() {
  return (
    <div className="cursor">
      <UseAnimations
        animation={twitter}
        size={30}
        strokeColor="white"
        wrapperStyle={{ padding: 10 }}
        render={(eventProps, animationProps) => (
          <a
            {...eventProps}
            href="http://www.twitter.com/share?url=https://adequaat.media/index.html"
            target="_blank"
            rel="noreferrer"
          >
            <div {...animationProps} />
          </a>
        )}
      />
      <UseAnimations
        animation={facebook}
        size={30}
        strokeColor="white"
        wrapperStyle={{ padding: 10 }}
      />
      <UseAnimations
        animation={linkedin}
        size={30}
        strokeColor="white"
        wrapperStyle={{ padding: 10 }}
        render={(eventProps, animationProps) => (
          <a
            {...eventProps}
            href="https://www.linkedin.com/sharing/share-offsite/?url=https://adequaat.media/index.html"
            target="_blank"
            rel="noreferrer"
          >
            <div {...animationProps} />
          </a>
        )}
      />
    </div>
  );
}

export default SocialIcons;
