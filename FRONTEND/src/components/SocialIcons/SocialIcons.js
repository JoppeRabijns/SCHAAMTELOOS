import UseAnimations from "react-useanimations";
import twitter from "react-useanimations/lib/twitter";
import facebook from "react-useanimations/lib/facebook";
import linkedin from "react-useanimations/lib/linkedin";

//https://stackoverflow.com/questions/9120539/facebook-share-link-without-javascript

function SocialIcons({ size }) {
  return (
    <div className="cursor" style={{ display: "flex",}}>
      <UseAnimations
        animation={twitter}
        size={size}
        strokeColor="white"
        wrapperStyle={{ padding: 10 }}
        render={(eventProps, animationProps) => (
          <a
            {...eventProps}
            href="http://www.twitter.com/share?url=https://schaamteloos.online/"
            target="_blank"
            rel="noreferrer"
          >
            <div {...animationProps} />
          </a>
        )}
      />
      <UseAnimations
        animation={facebook}
        size={size}
        strokeColor="white"
        wrapperStyle={{ padding: 10 }}
        render={(eventProps, animationProps) => (
          <a
            {...eventProps}
            href="https://www.facebook.com/sharer/sharer.php?u=https://schaamteloos.online/L&t=SCHAAMTELOOS"
            onClick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
            target="_blank"
            title="Share on Facebook"
            rel="noreferrer"
          >
            <div {...animationProps} />
          </a>
        )}
      />
      <UseAnimations
        animation={linkedin}
        size={size}
        strokeColor="white"
        wrapperStyle={{ padding: 10 }}
        render={(eventProps, animationProps) => (
          <a
            {...eventProps}
            href="https://www.linkedin.com/sharing/share-offsite/?url=https://schaamteloos.online/"
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
