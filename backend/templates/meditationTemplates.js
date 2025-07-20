// Professional meditation templates for each type
// These serve as fallback content when AI generation fails
// Each template is designed for 3-5 minutes base duration and can be extended

const meditationTemplates = {
  en: {
    sleep: [
    {
      name: "Body Scan Sleep",
      intro: "Welcome to this peaceful sleep meditation...... Find a comfortable position in your bed, allowing your body to sink into the mattress...... Close your eyes gently, and begin to notice your breathing...... There's nothing you need to do right now except relax and listen to my voice..........",
      
      breathing: "Let's begin with some calming breaths...... Breathe in slowly through your nose for a count of five...... one... two... three... four... five...... Hold your breath gently for five...... one... two... three... four... five...... And now exhale slowly through your mouth for five...... one... two... three... four... five...... Let your breathing return to its natural rhythm...... feeling more relaxed with each breath..........",
      
      bodyRelaxation: "Now we'll do a gentle body scan to release any tension...... Start by bringing your attention to your feet...... Feel them becoming heavy and warm...... Let that heaviness spread up through your ankles... your calves... your knees...... Feel your legs sinking deeper into the bed......... Now notice your hips and lower back...... Let them soften and release...... Feel your belly rising and falling with each breath...... Your chest expanding gently......... Bring your awareness to your shoulders...... Let them drop away from your ears...... Feel the weight of your arms...... heavy and relaxed...... Your hands resting peacefully......... Notice your neck...... Let it lengthen and soften...... Your jaw unclenches...... Your face relaxes...... Even the tiny muscles around your eyes let go..........",
      
      visualization: "Imagine yourself in a peaceful place...... Perhaps you're lying on a soft cloud...... floating gently through a starlit sky...... Or maybe you're resting in a beautiful garden...... surrounded by the soft scent of lavender...... The air is the perfect temperature...... You feel completely safe and protected......... With each breath, you drift deeper into relaxation...... Your mind becomes quiet and still...... like a calm lake reflecting the moon...... Any thoughts that arise simply float away like clouds...... There's no need to hold onto anything..........",
      
      affirmations: "As you rest here in perfect peace, know that...... You are safe...... You are warm...... You are protected...... You are loved......... Your body knows how to sleep...... It's safe to let go now...... You deserve this rest...... Tomorrow will take care of itself......... Right now, in this moment, everything is exactly as it should be..........",
      
      closing: "Continue to rest in this peaceful state...... Your body is heavy and relaxed...... Your mind is calm and quiet...... With each breath, you sink deeper into restful sleep......... I'll leave you now to drift off into peaceful dreams...... Sleep well...... Rest deeply...... And wake refreshed when it's time...... Sweet dreams.........."
    },
    
    {
      name: "Ocean Waves Sleep",
      intro: "Welcome to this soothing ocean sleep meditation...... Settle into your bed and make yourself completely comfortable...... Close your eyes and imagine you're lying on a beautiful beach at sunset...... The sound of gentle waves will guide you to peaceful sleep..........",
      
      breathing: "Begin by breathing deeply... Inhale the fresh ocean air... feeling it fill your lungs completely... Exhale slowly... releasing all the tension from your day... ... Listen to the rhythm of the waves... In... and out... In... and out... Let your breathing match this natural rhythm... Each breath taking you deeper into relaxation......",
      
      oceanVisualization: "Picture yourself lying on warm, soft sand... The sun is setting, painting the sky in beautiful colors... You can hear the gentle sound of waves rolling onto the shore... Each wave washes away your worries and stress... ... Feel the warm sand supporting your body... The gentle ocean breeze caressing your skin... You are completely safe and peaceful here... ... With each wave that rolls in, you feel more drowsy... more relaxed... The ocean is singing you to sleep......",
      
      bodyRelaxation: "Now let the waves wash over your body... Starting with your feet... Feel them becoming as heavy as wet sand... The waves flow up your legs... making them completely relaxed and heavy... ... The gentle water flows over your hips and lower back... All tension melts away like sand being smoothed by the tide... Your arms float peacefully... heavy and relaxed... ... Feel the waves washing over your chest... your shoulders... your neck... Your face becomes soft and peaceful... completely relaxed......",
      
      affirmations: "With each wave, you know... You are safe and protected... The ocean holds you gently... You are at perfect peace... ... Your body is ready for deep, restful sleep... The waves carry away all your worries... Tomorrow will bring new possibilities... ... Right now, there is only peace... only rest... only the gentle sound of waves......",
      
      closing: "Continue to rest here on this peaceful beach... The waves continue their gentle rhythm... rocking you to sleep... ... Let the sound of the ocean carry you into beautiful dreams... Sleep deeply... Rest completely... And wake refreshed like the dawn over the ocean... Sweet dreams......"
    },
    
    {
      name: "Progressive Muscle Relaxation Sleep",
      intro: "Welcome to this progressive muscle relaxation for sleep... This practice will help you release physical tension and prepare your body for deep rest... Find a comfortable position and close your eyes... We'll systematically relax every muscle in your body...",
      
      breathing: "Begin with three deep, releasing breaths... Inhale slowly through your nose... Hold for a moment... Then exhale completely through your mouth... letting go of the day... ... Again, breathe in deeply... feel your body expanding... Hold... and release with a long, slow exhale... ... One more time... inhale peace... hold... exhale all tension... Now let your breathing become natural and easy......",
      
      progressiveTension: "We'll now tense and release each muscle group... This helps your body learn the difference between tension and relaxation... First, focus on your feet... Curl your toes tightly... Hold for five seconds... one... two... three... four... five...... Now release... Feel the relaxation flood through your feet... ... Next, tense your calf muscles... Squeeze them tight... Hold... one... two... three... four... five...... And release... Feel the tension melting away......",
      
      fullBodyRelease: "Now tense your thigh muscles... Squeeze them as tight as you can... Hold for five... four... three... two... one... And completely let go... Feel the relief... ... Clench your fists... Hold them tight... five... four... three... two... one... Release and feel your arms become heavy and relaxed... ... Tense your shoulder muscles... Raise them up to your ears... Hold... And drop them down... Feel the release... ... Scrunch your face muscles... Squeeze your eyes shut... Hold... And completely relax... Let your face become soft and peaceful......",
      
      bodyIntegration: "Now that every muscle in your body has been tensed and released... Feel the deep relaxation throughout your entire body... Your feet are completely relaxed... Your legs are heavy and at ease... Your arms are loose and comfortable... Your face is soft and peaceful... ... Notice how different relaxation feels from tension... This is your body's natural state of rest... Let yourself sink deeper into this peaceful feeling......",
      
      affirmations: "Your body is now completely prepared for sleep... Every muscle is relaxed and at ease... You have released all the tension from your day... ... It's safe to let go completely now... Your body knows how to rest and repair itself... You deserve this peaceful sleep... ... Trust in your body's natural wisdom... Allow yourself to drift into deep, restorative sleep......",
      
      closing: "Rest here in this deeply relaxed state... Your body is heavy and comfortable... Your mind is calm and quiet... ... Let this relaxation carry you into peaceful sleep... Sleep deeply... Rest completely... And wake up feeling refreshed and renewed... Good night......"
    },
    
    {
      name: "Yoga Nidra Sleep",
      intro: "Welcome to this yoga nidra practice for sleep... Yoga nidra is a state of conscious relaxation that guides you to the edge of sleep... Lie down comfortably and close your eyes... Allow yourself to be completely supported by your bed...",
      
      intention: "Begin by setting an intention for your sleep... This might be 'I will sleep deeply and peacefully' or 'I will wake refreshed and energized'... Choose words that feel right for you... Hold this intention in your heart... ... Now let go of this intention... trusting that it will work in your subconscious mind while you sleep......",
      
      bodyAwareness: "Bring your attention to your body lying in bed... Notice the weight of your body on the mattress... Feel the places where your body touches the bed... Your head on the pillow... Your shoulders... Your back... Your legs... ... Simply observe these sensations without trying to change anything... Just notice... and let go... ... Feel yourself becoming heavier with each breath......",
      
      breathAwareness: "Now become aware of your natural breathing... Don't try to change your breath... Simply observe it... Notice the pause between inhale and exhale... The pause between exhale and inhale... ... Feel your breath becoming slower and deeper... Each breath taking you closer to sleep... Your body knows exactly how to breathe for rest......",
      
      senseWithdrawal: "Now imagine your senses withdrawing... Like a turtle pulling its head into its shell... Your eyes become heavy and relaxed... Your ears become quiet and peaceful... Your sense of taste and smell fade away... Your skin becomes less sensitive... ... You're moving inward... away from the external world... toward the peaceful realm of sleep......",
      
      visualization: "Imagine yourself in a place of perfect peace... This might be a cozy room... a peaceful garden... or floating in warm water... You feel completely safe and protected here... ... In this peaceful place, you can let go of all thoughts... all worries... all concerns... There's nothing you need to do... nowhere you need to go... ... You are exactly where you need to be......",
      
      affirmations: "As you rest in this peaceful state... Know that you are safe... You are loved... You are exactly where you need to be... ... Your body is healing and restoring itself... Your mind is becoming calm and quiet... Sleep comes naturally and easily... ... Tomorrow will bring new possibilities... But right now, there is only peace... only rest... only the gentle drift toward sleep......",
      
      closing: "Continue to rest in this state of yoga nidra... Between waking and sleeping... This is the perfect place to be... ... Allow yourself to drift deeper... If you fall asleep, that's perfect... If you stay in this peaceful awareness, that's perfect too... ... Rest now... Sleep now... And wake when it's time... Completely refreshed and renewed..."
    },
    
    {
      name: "Bedroom Sanctuary Sleep",
      intro: "Welcome to this bedroom sanctuary meditation... Your bedroom is your sacred space for rest and renewal... Tonight, we'll create a sense of safety and peace in your sleeping environment... Close your eyes and feel the comfort of your bed...",
      
      environmentalAwareness: "First, become aware of your bedroom... Notice the temperature... Is it cool and comfortable for sleep?... Feel the softness of your sheets... The support of your mattress... The comfort of your pillow... ... This is your sanctuary... Your safe haven... A place where you can completely let go... ... Feel gratitude for this space that shelters and protects you......",
      
      breathingAndGrounding: "Take three deep breaths... breathing in the peace of your bedroom... exhaling any stress from the day... ... With each breath, feel yourself sinking deeper into your bed... Your body becoming heavier... more relaxed... ... Feel your connection to this safe space... You are held... You are protected... You are home......",
      
      energyClearing: "Now imagine a gentle light filling your bedroom... This light clears away any negative energy from the day... Any stress... any worry... any tension... ... Watch this light gently dissolve anything that doesn't serve your peaceful sleep... Your bedroom becomes filled with calm, healing energy... ... This space is now perfectly prepared for your rest......",
      
      bodyBlessings: "Place your hands on your heart... Feel your heartbeat... This faithful heart that has carried you through the day... Thank your heart for its constant work... ... Move your hands to your belly... Thank your body for digesting your food... for breathing... for all its automatic functions... ... Your body is wise... It knows how to rest and repair itself while you sleep......",
      
      protection: "Imagine a protective bubble of light surrounding your bed... This bubble keeps you safe while you sleep... Nothing can harm you here... You are completely protected... ... Any worries or fears from the day cannot enter this sacred space... Only peace... only love... only healing energy can reach you here... ... You are safe to completely let go......",
      
      affirmations: "As you rest in your bedroom sanctuary... Know that you are exactly where you need to be... This bed holds you with love... This room protects you with care... ... Your sleep will be deep and peaceful... Your dreams will be gentle and healing... You will wake refreshed and renewed... ... You are blessed... You are loved... You are safe......",
      
      closing: "Continue to rest in your bedroom sanctuary... Feel the love and protection that surrounds you... Your body is relaxed... Your mind is peaceful... ... Let this sacred space hold you as you drift into sleep... Sleep peacefully... Rest deeply... And wake with gratitude for this gift of rest... Sweet dreams......"
    }
  ],

  stress: [
    {
      name: "Mindfulness Stress Relief",
      intro: "Welcome to this stress relief meditation... Find a comfortable seated position, with your back straight but not rigid... Place your feet flat on the floor, feeling the ground beneath you... Rest your hands gently on your lap... And when you're ready, close your eyes or soften your gaze downward...",
      
      breathing: "Let's begin by taking a few deep, cleansing breaths... Breathe in through your nose, filling your lungs completely... And exhale through your mouth, releasing any tension... ... Again, breathe in deeply... feeling your chest and belly expand... And breathe out... letting go of stress and worry... One more time... breathe in fresh, calming energy... And breathe out all that no longer serves you......",
      
      bodyAwareness: "Now bring your attention to your body... Notice any areas where you're holding tension... Perhaps in your shoulders... your jaw... your belly... ... Without trying to change anything, simply notice these sensations... Acknowledge them with kindness... ... Now imagine breathing into these tense areas... With each inhale, send breath and space to the tension... With each exhale, feel the tightness beginning to soften... ... Continue this gentle breathing... in... creating space... out... releasing tension......",
      
      mindfulness: "Let your attention rest on the present moment... Notice the feeling of your breath moving in and out... The gentle rise and fall of your chest... ... When thoughts about your day arise... and they will... simply notice them without judgment... Like clouds passing through the sky... Let them drift by... ... Return your attention to your breath... This is your anchor... Always available... Always present... ... There's nothing you need to figure out right now... No problems to solve... Just this breath... then the next......",
      
      visualization: "Imagine a warm, golden light above your head... This is the light of peace and calm... With each breath, this light flows down through your body... ... It flows through your head... releasing mental tension... Down through your neck and shoulders... melting away stress... Through your chest... calming your heart... Down your arms to your fingertips... ... The golden light continues through your belly... soothing any anxiety... Down through your hips and legs... grounding you... All the way to your toes... ... You are now filled with this peaceful, golden light......",
      
      closing: "As we prepare to end this meditation... Know that this sense of calm is always available to you... Just a few breaths away... ... Begin to wiggle your fingers and toes... Roll your shoulders gently... And when you're ready, slowly open your eyes... ... Take a moment to notice how you feel... Carry this peace with you as you continue your day... Remember, you can return to this calm center whenever you need... Thank you for taking this time for yourself......"
    },
    
    {
      name: "Body Scan Stress Release",
      intro: "Welcome to this body scan meditation for stress release... This practice helps you systematically release tension held throughout your body... Find a comfortable position... Close your eyes and prepare to journey through your body with awareness and compassion...",
      
      breathing: "Start by taking three deep, releasing breaths... Breathe in through your nose... filling your body with calming energy... Exhale through your mouth... releasing the stress of the day... ... Feel your body beginning to relax... Your breath becoming deeper and more natural... Each exhale carries away tension... Each inhale brings peace......",
      
      headAndNeck: "Begin by bringing your attention to the top of your head... Notice any tension or tightness... Breathe into this area... Send relaxation to your scalp... ... Move your attention to your forehead... Often we hold stress here... Let your forehead become smooth and relaxed... ... Notice your eyes... Let them soften... Your jaw... Let it unlock and relax... Feel your whole face becoming peaceful......",
      
      shouldersAndArms: "Now focus on your neck... This area often holds the weight of our stress... Breathe into your neck... Let it lengthen and soften... ... Bring your attention to your shoulders... Notice if they're raised toward your ears... Let them drop down... Feel the relief as they release... ... Your arms... Let them become heavy and relaxed... Your hands... Let them rest peacefully... All tension flowing away through your fingertips......",
      
      torsoAndCore: "Focus on your chest... Sometimes stress makes our chest feel tight... Breathe into your chest... Let it expand and relax... ... Your heart... Send it love and appreciation... It's been working hard... Let it rest in peace... ... Your belly... This is where we often hold emotional tension... Breathe into your belly... Let it soften and release... ... Your back... Let it be supported... All the burdens you carry... let them go......",
      
      lowerBodyRelease: "Bring your attention to your hips... Let them settle and relax... ... Your legs... Let them become heavy and loose... Feel the stress draining down through your legs... ... Your feet... Let them completely relax... Feel all the tension leaving your body through your feet... flowing into the earth... ... Your whole body is now relaxed and at peace......",
      
      integration: "Take a moment to feel your entire body... Relaxed... peaceful... free from tension... ... Notice how different you feel when stress is released... This is your body's natural state... Remember this feeling... You can return to it whenever you need... ... Breathe in this peace... Breathe out any remaining tension......",
      
      closing: "As we complete this body scan... Know that you have the power to release stress at any time... Simply breathe into tension and let it go... ... Slowly begin to move your fingers and toes... When you're ready, open your eyes... Carry this relaxation with you into your day... You are calm... You are at peace... You are in control of your stress response..."
    },
    
    {
      name: "Breathing for Stress Relief",
      intro: "Welcome to this breathing meditation for stress relief... When we're stressed, our breathing becomes shallow and rapid... This practice will help you use your breath to activate your body's natural relaxation response... Find a comfortable position and close your eyes...",
      
      breathAwareness: "Begin by simply noticing your breath... Don't try to change it... Just observe... Notice where you feel your breath most clearly... Perhaps at your nostrils... or in your chest... or your belly... ... Simply watch your breath for a few moments... This is your life force... Always available... Always supporting you......",
      
      deepBreathing: "Now we'll deepen your breathing... Place one hand on your chest and one on your belly... As you breathe in, feel your belly expand... This is deep, diaphragmatic breathing... ... Breathe in slowly through your nose... feeling your belly rise... Breathe out through your mouth... feeling your belly fall... ... Continue this deep breathing... In through the nose... Out through the mouth... Each breath releasing stress......",
      
      countedBreathing: "Now let's add counting to regulate your breath... Breathe in for a count of four... one... two... three... four...... Hold for four... one... two... three... four...... Breathe out for six... one... two... three... four... five... six...... The longer exhale helps activate your relaxation response...... Continue this pattern... In for four... Hold for four... Out for six...... Feel your nervous system calming with each breath......",
      
      breathVisualization: "As you continue this breathing pattern... Imagine breathing in calm, cool air... This air carries peace and tranquility... ... As you breathe out, imagine releasing hot, tense air... This air carries away your stress and worry... ... In... cool, calming air... Out... hot, stressful air... ... With each cycle, you become more relaxed... more at peace......",
      
      affirmations: "As you breathe, repeat these affirmations silently... 'I am calm'... Breathe in... 'I am at peace'... Breathe out... ... 'I release all stress'... Breathe in... 'I am in control'... Breathe out... ... 'I am safe'... Breathe in... 'I am relaxed'... Breathe out... ... Continue with any affirmations that feel right for you......",
      
      integration: "Now let your breathing return to normal... But notice how different it feels... Deeper... more relaxed... more natural... ... Remember, your breath is always with you... Whenever you feel stressed, you can return to this calm breathing... ... Take a moment to appreciate this tool you always carry with you......",
      
      closing: "As we end this breathing meditation... Know that you have accessed your body's natural stress relief system... Your breath is your constant companion... always ready to help you find calm... ... Take three more deep breaths... Wiggle your fingers and toes... When you're ready, open your eyes... You are calm... You are centered... You are at peace..."
    },
    
    {
      name: "Grounding for Stress Relief",
      intro: "Welcome to this grounding meditation for stress relief... When we're stressed, we often feel scattered and overwhelmed... This practice will help you feel centered, stable, and connected to the present moment... Find a comfortable seated position with your feet on the floor...",
      
      physicalGrounding: "Begin by feeling your connection to the earth... Feel your feet flat on the floor... Press them gently into the ground... ... Feel your sitting bones in contact with your chair... Your back against the chair... ... Notice the temperature of the air on your skin... The texture of your clothing... ... These physical sensations anchor you in the present moment... You are here... You are safe... You are grounded......",
      
      breathingAndEarth: "Now imagine roots growing from your feet... Deep into the earth... These roots connect you to the stable, supportive energy of the earth... ... With each breath, feel these roots growing deeper... anchoring you... supporting you... ... The earth is always here for you... Solid... reliable... unchanging... ... Feel this stability rising up through your roots... into your body... grounding you......",
      
      fiveToGrounding: "Let's use the 5-4-3-2-1 technique to ground yourself... Notice five things you can hear... Perhaps the sound of your breath... sounds outside... the hum of electricity... ... Notice four things you can touch... Your feet on the floor... your hands in your lap... the chair supporting you... your clothing... ... Notice three things you can smell... The air in the room... perhaps a faint scent of cleaning products... or outside air... ... Notice two things you can taste... Perhaps the lingering taste of something you drank... or just the taste of your mouth... ... Notice one thing you can see with your eyes closed... Perhaps patterns of light... or just darkness... ... You are fully present... fully grounded......",
      
      mountainVisualization: "Imagine yourself as a mountain... Strong... solid... unmovable... ... Your base is deep and wide... rooted firmly in the earth... Nothing can shake you... ... Storms may come and go around you... But you remain steady... stable... grounded... ... Feel this mountain strength in your own body... You are solid... You are stable... You are grounded......",
      
      stressRelease: "Now imagine all your stress... all your worries... all your tensions... flowing down through your body... Down through your roots... into the earth... ... The earth is infinitely capable of absorbing and transforming this stress... ... With each breath, send more stress down through your roots... Let the earth take it... transform it... ... You are becoming lighter... clearer... more at peace......",
      
      affirmations: "Repeat these grounding affirmations... 'I am connected to the earth'... 'I am stable and strong'... 'I am present in this moment'... ... 'I am safe and secure'... 'I am grounded and centered'... 'I am at peace'... ... Feel these truths in your body... in your bones... in your connection to the earth......",
      
      closing: "As we end this grounding meditation... Feel how different you are now... More stable... more centered... more at peace... ... Remember, you can connect to this grounding energy anytime... Simply feel your feet on the floor... your connection to the earth... ... Take three deep breaths... Wiggle your fingers and toes... When you're ready, open your eyes... You are grounded... You are centered... You are at peace..."
    },
    
    {
      name: "Stress Release Visualization",
      intro: "Welcome to this stress release visualization... Sometimes we need to actively release stress that feels stuck in our bodies and minds... This practice will help you visualize releasing stress and replacing it with peace... Find a comfortable position and close your eyes...",
      
      stressAwareness: "Begin by acknowledging the stress you're carrying... Without judgment... simply notice where you feel it in your body... Perhaps tension in your shoulders... tightness in your chest... a knot in your stomach... ... It's okay to feel this stress... It's your body's way of responding to challenges... But now it's time to let it go......",
      
      breathingPrep: "Take three deep breaths... With each exhale, give yourself permission to release... ... Breathe in... accepting where you are right now... Breathe out... beginning to let go... ... Breathe in... gathering your strength... Breathe out... preparing to release... ... Breathe in... connecting to your inner peace... Breathe out... ready to transform......",
      
      colorVisualization: "Now imagine your stress as a color... What color comes to mind?... Perhaps dark gray... or heavy black... or hot red... ... See this color in the areas of your body where you feel stress... Notice how it looks... how it feels... ... Now imagine a healing light approaching... This might be golden... or bright white... or soft blue... whatever feels healing to you... ... This healing light is going to transform your stress......",
      
      transformation: "Watch as the healing light begins to touch the areas of stress... See how it begins to dissolve the dark, heavy color... ... With each breath, the healing light grows stronger... penetrating deeper... transforming the stress... ... Breathe in the healing light... Breathe out the stress color... ... In... healing and peace... Out... stress and tension... ... Continue this process... watching the transformation happen......",
      
      lightFilling: "As the stress color is completely dissolved... watch as the healing light fills every cell of your body... ... Your head is filled with this peaceful light... Your neck and shoulders... Your arms and hands... Your chest and heart... ... Your belly... Your back... Your hips... Your legs... Your feet... ... Your entire body is now filled with healing, peaceful light... You are transformed......",
      
      energyShield: "Now imagine this healing light extending beyond your body... Creating a protective bubble around you... This bubble protects you from taking on new stress... ... You can see stress trying to reach you... but it bounces off your protective light... You remain peaceful and protected... ... This shield goes with you... protecting your peace throughout your day......",
      
      affirmations: "From this place of peace and protection, affirm... 'I am free from stress'... 'I am filled with peace'... 'I am protected and safe'... ... 'I choose calm over chaos'... 'I am in control of my response'... 'I am at peace'... ... Feel these affirmations becoming true in your body... in your mind... in your life......",
      
      closing: "As we complete this visualization... Know that you have the power to transform stress into peace... This healing light is always available to you... ... Take three deep breaths... Feeling peaceful... protected... transformed... ... Wiggle your fingers and toes... When you're ready, open your eyes... You are free... You are at peace... You are protected..."
    }
  ],

  focus: [
    {
      name: "Breath Anchor Focus",
      intro: "Welcome to this focus and concentration meditation... Sit comfortably with your spine tall and alert... Rest your hands on your knees or in your lap... Take a moment to set an intention for clarity and focus... When you're ready, gently close your eyes...",
      
      breathing: "Begin by taking three deep, energizing breaths... Breathe in through your nose, filling your lungs with fresh air... And exhale completely through your mouth... ... Again, inhale deeply... feeling alert and awake... Exhale fully... releasing any mental fog... One more time... breathe in clarity... breathe out distraction... ... Now let your breathing return to normal... but keep your attention on each breath......",
      
      anchorPractice: "We'll use your breath as an anchor for your attention... Focus on the sensation of air entering your nostrils... Cool on the inhale... Warm on the exhale... ... Keep your attention right at the tip of your nose... Where you first feel the breath... ... When your mind wanders—and it will—simply notice where it went... Then gently, without judgment, bring your attention back to the breath... This is the practice... Notice... Return... Again and again......",
      
      countingMeditation: "To sharpen your focus further, let's add counting... On your next inhale, mentally count 'one'... On the exhale, count 'two'... Inhale, 'three'... Exhale, 'four'... ... Continue counting up to ten... Then start again at one... ... If you lose count, no problem... Simply begin again at one... This trains your mind to stay present and focused... ... One... two... three... four... maintaining steady attention......",
      
      visualization: "Now imagine a bright point of light at the center of your forehead... This is your focus point... See it clearly in your mind's eye... ... This light represents your concentrated attention... Notice how it becomes brighter and more stable as you focus... ... Any distracting thoughts are like shadows... They can't affect this bright, steady light... Your focus remains clear and strong... ... Feel your mind becoming sharper... more alert... ready for whatever task awaits......",
      
      affirmations: "Mentally repeat these affirmations for focus... 'My mind is clear and sharp'... ... 'I am fully present and aware'... ... 'My concentration is strong and steady'... ... 'I focus with ease and clarity'... ... Let these words sink deep into your consciousness......",
      
      closing: "As we complete this meditation... Feel the enhanced clarity in your mind... Your improved ability to focus... ... Begin to deepen your breathing... Wiggle your fingers and toes... And when you're ready, open your eyes... ... Notice how alert and focused you feel... Your mind is clear, sharp, and ready... Carry this focused attention into your next activity... You are prepared to work with precision and clarity......"
    }
  ],

  anxiety: [
    {
      name: "Grounding Anxiety Relief",
      intro: "Welcome to this anxiety relief meditation... Find a comfortable position where you feel supported and safe... You might want to place one hand on your heart and one on your belly... This helps you feel grounded and connected to yourself... Take a moment to arrive here fully...",
      
      grounding: "Let's begin by grounding ourselves in the present moment... Feel your feet on the floor... or your body in the chair... Notice five things you can feel right now... The temperature of the air... The texture of your clothing... The weight of your body... ... This is real... This is now... You are safe in this moment......",
      
      breathing: "Now let's use a calming breath pattern... Breathe in slowly for four counts... one... two... three... four...... Hold gently for four... one... two... three... four...... And exhale slowly for six... one... two... three... four... five... six...... This longer exhale activates your body's relaxation response...... Again... in for four... hold for four... out for six...... Continue this soothing rhythm... feeling calmer with each cycle......",
      
      bodyRelease: "Scan your body for any areas of tension or anxiety... You might notice tightness in your chest... butterflies in your stomach... tension in your shoulders... ... That's okay... This is your body trying to protect you... Thank it for caring about your safety... ... Now imagine breathing into these areas... Send them compassion and warmth... With each exhale, let the anxiety soften just a little... You don't have to force anything... Just allow......",
      
      visualization: "Imagine yourself in a place where you feel completely safe and calm... This might be a cozy room... a peaceful beach... a quiet forest... wherever feels right for you... ... Notice all the details of this safe place... The colors... the sounds... the smells... the textures... ... Feel yourself relaxing more deeply in this sanctuary... Here, nothing can harm you... You are protected and at peace... ... If anxious thoughts arise, imagine them as leaves floating by on a gentle stream... You can observe them without being swept away......",
      
      affirmations: "Let's offer ourselves some calming affirmations... 'I am safe in this moment'... ... 'This feeling will pass'... ... 'I have survived anxiety before, and I will survive it again'... ... 'I am stronger than my anxiety'... ... 'Peace is my natural state'... ... 'I choose calm'......",
      
      closing: "As we end this meditation... Remember that you always have these tools available... Your breath... Your safe place... Your inner strength... ... Begin to gently move your body... Maybe stretch a little... Take a deep breath and slowly open your eyes... ... Notice any shift in how you feel... Even a small change is significant... Be gentle with yourself as you return to your day... You are brave... You are capable... And you are not alone......"
    }
  ],

  energy: [
    {
      name: "Golden Sun Energy",
      intro: "Welcome to this energizing meditation... Sit or stand in a position that feels strong and alert... Imagine a string pulling you up from the crown of your head... Feel your spine lengthen... your chest open... You're about to awaken your natural vitality...",
      
      breathing: "Let's begin with some energizing breaths... Take a deep breath in through your nose... filling your entire body with fresh energy... And exhale forcefully through your mouth with a 'HA' sound... releasing any fatigue... ... Again, breathe in vitality and life force... And exhale 'HA'... letting go of sluggishness... One more time... inhale power and energy... Exhale 'HA'... feeling more awake......",
      
      bodyAwakening: "Now let's awaken your body's energy... Start by rubbing your palms together vigorously... Feel the heat and energy building... Place your warm palms over your eyes for a moment... ... Now tap gently all over your scalp with your fingertips... Awakening your mind... Massage your temples in small circles... ... Roll your shoulders back... feeling your chest open and expand... Gently twist your spine left and right... Feeling energy flow through your core......",
      
      energyVisualization: "Imagine a bright golden sun at the center of your chest... This is your inner source of energy... With each breath, this sun grows brighter and larger... ... Feel its warm rays spreading through your entire body... Up through your chest and shoulders... Down your arms to your fingertips... which tingle with energy... ... The golden light flows up through your throat and head... Your mind becomes clear and alert... Down through your belly and hips... Through your legs... grounding you while energizing you... ... Your whole body glows with vibrant life force......",
      
      affirmations: "Let's activate your energy with powerful affirmations... 'I am filled with vibrant energy'... ... 'My body is strong and alive'... ... 'I have all the energy I need for my day'... ... 'I am motivated and ready for action'... ... 'Energy flows freely through me'... ... Feel these words charging every cell of your body......",
      
      activation: "Now let's seal in this energy... Take three deep breaths, making each one bigger than the last... First breath... feeling energy building... Second breath... energy expanding... Third breath... hold it at the top... feel the energy pulsing through you... And release with a smile... ... Feel your eyes bright and alert... Your mind sharp and focused... Your body energized and ready......",
      
      closing: "As we complete this energizing meditation... Feel the vitality coursing through your veins... You are awake... alert... and fully charged... ... Begin to move your body however feels good... Maybe stretch your arms overhead... Roll your neck... Bounce gently on your toes... ... When you're ready, open your eyes wide... Take in the world with fresh energy... You are ready to embrace your day with enthusiasm and power... Go forth and shine your light......"
    }
  ],

  mindfulness: [
    {
      name: "Present Moment Awareness",
      intro: "Welcome to this mindfulness meditation... Find a comfortable position where you can sit with alertness and ease... This practice is about cultivating awareness of the present moment... There's nowhere to go and nothing to achieve... simply be here now...",
      
      breathing: "Let's begin by anchoring ourselves in the breath... Notice your natural breathing rhythm... don't change it... just observe... ... Feel the air entering through your nostrils... the slight pause... and the gentle release... ... Your breath is always happening in the present moment... Use it as your anchor to the here and now... When your mind wanders... simply return to the breath... no judgment... just gentle return......",
      
      bodyAwareness: "Now expand your awareness to include your body... Notice how you're sitting... Feel the contact points where your body meets the surface... ... Scan through your body with gentle curiosity... What sensations are present right now?... Maybe warmth... coolness... tension... relaxation... ... Simply notice whatever is here... without trying to change anything... Your body is a gateway to presence......",
      
      thoughtAwareness: "As we continue... notice any thoughts that arise... Rather than getting caught up in the story... see if you can observe thoughts like clouds passing through the sky of your mind... ... Some thoughts are light and wispy... others might be heavy storm clouds... All are welcome... all will pass... ... You are not your thoughts... you are the aware space in which thoughts appear and disappear......",
      
      presentMoment: "Right now... in this very moment... everything is exactly as it is... There's a deep peace in accepting what's here... without resistance... ... Listen to the sounds around you... notice they're arising fresh in each moment... ... Feel the aliveness in your body... the energy of being here... now... ... This moment is the only moment that ever exists... and it's constantly renewing itself......",
      
      affirmations: "Let these words settle into your awareness... 'I am present'... ... 'I am here now'... ... 'This moment is enough'... ... 'I am aware and awake'... ... 'Peace is found in presence'...",
      
      closing: "As we conclude this practice... take a moment to appreciate that you've given yourself the gift of presence... ... Notice how you feel after spending time in mindful awareness... ... When you're ready... slowly open your eyes if they were closed... ... See if you can carry this quality of presence with you... into your next activity... and throughout your day... The present moment is always available... always waiting for your return......"
    }
  ],

  compassion: [
    {
      name: "Loving-Kindness Heart Practice",
      intro: "Welcome to this compassion meditation... Settle into a comfortable position and place one hand on your heart... We'll be cultivating loving-kindness... first for yourself... then extending it outward to others... This is a practice of opening the heart...",
      
      selfCompassion: "Begin by bringing yourself to mind... Imagine yourself as you are right now... See yourself with kind eyes... as you would look at a dear friend... ... Silently offer yourself these words of loving-kindness... 'May I be happy... May I be healthy... May I be at peace... May I live with ease...' ... Feel these wishes in your heart... Notice any resistance... and be gentle with that too... You deserve love... especially from yourself......",
      
      lovedOne: "Now bring to mind someone you love easily... a family member... a close friend... a beloved pet... See their face... feel your natural affection for them... ... Extend the same loving wishes... 'May you be happy... May you be healthy... May you be at peace... May you live with ease...' ... Feel the warmth in your heart as you send them love... Notice how good it feels to wish someone well......",
      
      neutral: "Now think of someone neutral... maybe a cashier you see regularly... a neighbor you barely know... someone neither friend nor enemy... ... Practice extending the same loving-kindness... 'May you be happy... May you be healthy... May you be at peace... May you live with ease...' ... This person wants to be happy just like you... They face struggles just like you... See if you can connect with their shared humanity......",
      
      difficult: "If you feel ready... bring to mind someone with whom you have difficulty... Start with someone mildly challenging... not the most difficult person in your life... ... This might feel hard... go slowly... 'May you be happy... May you be healthy... May you be at peace... May you live with ease...' ... Remember... their happiness doesn't take away from yours... Hurt people often hurt people... Can you find compassion for their pain?......",
      
      universal: "Finally... expand your awareness to include all beings everywhere... See the earth from space... all creatures... all humans... struggling and seeking happiness... ... With an open heart... offer this universal loving-kindness... 'May all beings be happy... May all beings be healthy... May all beings be at peace... May all beings live with ease...' ... Feel yourself as part of this vast web of connection... giving and receiving love......",
      
      closing: "Rest your hand on your heart once more... Feel the warmth there... the love you've generated... This loving-kindness lives in you always... ... Remember... true compassion includes yourself... Be gentle with yourself as you move through your day... ... When you encounter others... see if you can remember this heart connection... Everyone is doing their best with what they have... Everyone deserves love... starting with you......"
    }
  ],

  walking: [
    {
      name: "Mindful Walking Practice",
      intro: "Welcome to this walking meditation... You can do this practice anywhere... indoors in a quiet space... or outside in nature... Begin by standing still... feeling your feet on the ground... We'll transform walking into a meditation...",
      
      preparation: "Start by standing with your feet hip-width apart... Feel the contact between your feet and the earth... Notice your posture... spine tall but not rigid... shoulders relaxed... arms hanging naturally at your sides... ... Take a few deep breaths... arriving fully in your body... in this moment... Set the intention to walk with awareness... each step a meditation......",
      
      firstSteps: "Begin to lift your right foot slowly... Notice the shift of weight to your left foot... Feel the lifting... the moving... the placing of your foot... ... Take each step deliberately... about half your normal walking speed... There's no destination... no hurry... just the simple act of walking... ... Notice how your body naturally balances... coordinates... moves through space... Marvel at this everyday miracle......",
      
      breathAndSteps: "Now coordinate your breathing with your steps... Perhaps two steps on the inhale... two steps on the exhale... Find a rhythm that feels natural... ... If your mind wanders to your destination or your to-do list... gently bring attention back to the physical sensation of walking... The feeling of your feet touching the ground... lifting... moving forward......",
      
      awareness: "Expand your awareness to include your environment... If outdoors... notice the air temperature... any breeze... the sounds of nature... birds... rustling leaves... ... If indoors... be aware of the space around you... the lighting... the quality of air... ... Stay connected to the sensation of walking while taking in your surroundings... Walking as a dance between inner awareness and outer presence......",
      
      gratitude: "As you continue walking... bring appreciation to this amazing body... Your legs carrying you... your feet supporting you... your balance keeping you stable... ... Feel gratitude for your ability to move through the world... Not everyone has this gift... Each step is a privilege... ... Notice how walking meditation creates a moving sanctuary... peace in motion......",
      
      closing: "Gradually come to a stop... Stand still for a moment... Feel your feet firmly on the ground... Notice any sensations in your body from this mindful walking... ... Take a moment to appreciate that you can bring this quality of awareness to any movement... Walking to your car... up the stairs... across a room... ... Every step can be an opportunity for presence... for return to the here and now... Carry this walking awareness with you into your day......"
    }
  ],

  breathing: [
    {
      name: "Complete Breath Practice",
      intro: "Welcome to this breathing meditation... Find a comfortable position... sitting or lying down... Place one hand on your chest... one on your belly... We'll explore the full power of conscious breathing... Your breath is always available... always ready to center and calm you...",
      
      naturalBreath: "Begin by simply observing your natural breath... Don't change anything yet... just notice... ... Feel which hand moves more... the chest or the belly... Notice the rhythm... the depth... the pauses between inhale and exhale... ... Your breath reflects your current state... and by changing your breath... you can change how you feel... This is your superpower......",
      
      bellyBreathing: "Now let's practice deep belly breathing... On your next inhale... breathe down into your belly... Let the hand on your belly rise while the chest hand stays relatively still... ... Exhale slowly... feeling the belly hand lower... This is how babies breathe naturally... deep... relaxed... healing... ... Continue this pattern... Inhale into the belly... exhale completely... Each breath activating your body's relaxation response......",
      
      threePartBreath: "Now we'll explore the complete three-part breath... Inhale first into your belly... then expand your ribs... finally lift your chest... ... Exhale in reverse order... chest softens... ribs contract... belly draws in... ... This is like filling and emptying a balloon from bottom to top... Complete... nourishing... balancing... Take your time with each phase......",
      
      countedBreath: "Let's add counting to create rhythm and focus... Inhale for a count of four... one... two... three... four...... Hold gently for two... one... two...... Exhale for six... one... two... three... four... five... six...... This pattern activates your parasympathetic nervous system... your rest and digest response...... Continue at your own pace... adjusting the counts if needed......",
      
      breathAwareness: "Notice how your breathing affects your whole being... With each conscious breath... your nervous system settles... your mind clears... your body relaxes... ... Your breath is like a bridge between your conscious and unconscious mind... between your body and your spirit... ... Feel the life force... the prana... flowing in with each inhale... Stagnant energy releasing with each exhale......",
      
      affirmations: "With each inhale... silently say 'I am calm'... With each exhale... 'I am at peace'... ... Or choose your own words... 'Breathing in peace... breathing out tension'... 'Inhaling clarity... exhaling confusion'... ... Let your breath carry these intentions deep into every cell of your body......",
      
      closing: "As we complete this breathing practice... return to your natural rhythm... Notice any changes in how you feel... Perhaps more relaxed... more centered... more present... ... Remember... your breath is always with you... In moments of stress... anxiety... or overwhelm... you can return to conscious breathing... ... Take three final deep breaths... appreciating this ancient practice that's always available... Your breath is your constant companion... your pathway to peace......"
    }
  ],

  morning: [
    {
      name: "Dawn Awakening Practice",
      intro: "Welcome to this morning meditation... A beautiful way to begin your day... Sit comfortably... perhaps near a window where you can sense the morning light... We'll set a positive intention for the day ahead... awakening both body and spirit...",
      
      gratitude: "Begin by taking a moment to appreciate that you've awakened to a new day... A fresh start... new possibilities... ... Bring to mind three things you're grateful for right now... Maybe your comfortable bed... the roof over your head... someone you love... ... Feel that gratitude in your heart... Let it expand... This appreciation sets a positive tone for everything that follows......",
      
      bodyAwakening: "Now let's gently awaken your body... Roll your shoulders back... feeling your chest open to the new day... ... Stretch your arms overhead... reaching toward your highest potential... ... Take a deep yawn if it comes... letting your body transition from sleep to wakefulness... ... Wiggle your fingers and toes... feeling the life force flowing to your extremities... Your body is ready for the day......",
      
      breathingEnergy: "Let's use breathing to build gentle energy... Inhale slowly... imagining you're breathing in the fresh energy of the morning... Exhale... releasing any grogginess or fatigue... ... With each breath... feel yourself becoming more alert... more alive... more present... ... Imagine the morning light... whether you can see it or not... filling your body with vitality and clarity......",
      
      intention: "Now set an intention for your day... Not a to-do list... but a way of being... How do you want to show up today?... With kindness... with patience... with joy... with presence?... ... Choose one quality you want to embody... Let it settle into your heart... ... Visualize yourself moving through your day with this intention... Meeting challenges with grace... Connecting with others from this centered place......",
      
      visualization: "See your day unfolding with ease and flow... Important tasks completing smoothly... Interactions filled with warmth and understanding... Obstacles becoming opportunities for growth... ... You move through your day like a river... adaptable... flowing around challenges... always finding your way... ... Feel yourself at the end of the day... satisfied... accomplished... at peace......",
      
      affirmations: "Let's plant some positive seeds for the day... 'Today is full of possibilities'... ... 'I have everything I need within me'... ... 'I approach this day with curiosity and openness'... ... 'I am grateful for this opportunity to live and grow'... ... 'I choose joy and presence in each moment'... ... Feel these words taking root in your consciousness......",
      
      closing: "As we complete this morning meditation... feel yourself fully awake... alert... and ready... ... Take three deep breaths... each one bringing you more fully into the present moment... ... When you open your eyes... really see the world around you... Notice the light... the colors... the beauty that's always there... ... Carry this sense of appreciation and intention with you... You're ready to make this day meaningful... Step forward with confidence and joy......"
    }
  ]
  },

  // Nederlandse meditatie templates
  nl: {
    sleep: [
      {
        name: "Lichaamsscan Slaap",
        intro: "Welkom bij deze vredige slaapmeditatie... Zoek een comfortabele positie in je bed... laat je lichaam wegzakken in het matras... Sluit je ogen zachtjes en begin je ademhaling op te merken... Er is nu niets dat je hoeft te doen... behalve ontspannen en naar mijn stem luisteren...",
        
        breathing: "Laten we beginnen met wat kalmerende ademhalingen... Adem langzaam in door je neus... tel tot vijf... één... twee... drie... vier... vijf... Houd je adem zachtjes vast... één... twee... drie... vier... vijf... En nu langzaam uitademen door je mond... één... twee... drie... vier... vijf... Laat je ademhaling terugkeren naar het natuurlijke ritme... je voelt je meer ontspannen bij elke ademhaling......",
        
        bodyRelaxation: "Nu gaan we een zachte lichaamsscan doen om alle spanning los te laten... Begin met je aandacht naar je voeten... Voel hoe ze zwaar en warm worden... Laat die zwaarte omhoog stromen door je enkels... je kuiten... je knieën... Voel je benen dieper wegzakken in het bed... ... Breng nu je aandacht naar je heupen en onderrug... Laat ze zacht worden en loslaten... Voel je buik op en neer gaan met elke ademhaling... Je borst die zachtjes uitzet... ... Breng je bewustzijn naar je schouders... Laat ze wegvallen van je oren... Voel het gewicht van je armen... zwaar en ontspannen... Je handen rusten vredig... ... Merk je nek op... Laat deze langer worden en zachter... Je kaak ontspant... Je gezicht wordt rustig... Zelfs de kleine spiertjes rond je ogen laten los......",
        
        visualization: "Stel je voor dat je op een vredige plek bent... Misschien lig je op een zachte wolk... zachtjes drijvend door een sterrenhemel... Of misschien rust je in een prachtige tuin... omringd door de zachte geur van lavendel... De lucht heeft de perfecte temperatuur... Je voelt je volledig veilig en beschermd... ... Met elke ademhaling drijf je dieper weg in ontspanning... Je geest wordt stil en rustig... als een kalm meer dat de maan weerkaatst... Gedachten die opkomen drijven gewoon weg als wolken... Je hoeft nergens aan vast te houden......",
        
        affirmations: "Terwijl je hier rust in perfecte vrede... weet dat... Je bent veilig... Je bent warm... Je bent beschermd... Je bent geliefd... ... Je lichaam weet hoe het moet slapen... Het is veilig om nu los te laten... Je verdient deze rust... Morgen zorgt wel voor zichzelf... ... Op dit moment... in dit nu... is alles precies zoals het hoort te zijn......",
        
        closing: "Blijf rusten in deze vredige toestand... Je lichaam is zwaar en ontspannen... Je geest is kalm en stil... Met elke ademhaling zak je dieper weg in rustgevende slaap... ... Ik laat je nu alleen om weg te drijven in vredige dromen... Slaap lekker... Rust diep... En word verfrist wakker wanneer het tijd is... Welterusten......"
      },
      
      {
        name: "Oceaangolven Slaap",
        intro: "Welkom bij deze rustgevende oceaan slaapmeditatie... Nestel je comfortabel in je bed... Sluit je ogen en stel je voor dat je ligt op een prachtig strand bij zonsondergang... Het geluid van zachte golven zal je naar een vredige slaap leiden...",
        
        breathing: "Begin met diep ademhalen... Inademen van de frisse zeelucht... voel hoe deze je longen volledig vult... Langzaam uitademen... laat alle spanning van de dag los... ... Luister naar het ritme van de golven... In... en uit... In... en uit... Laat je ademhaling dit natuurlijke ritme volgen... Elke ademhaling brengt je dieper in ontspanning......",
        
        oceanVisualization: "Stel je voor dat je ligt op warm... zacht zand... De zon gaat onder en schildert de lucht in prachtige kleuren... Je hoort het zachte geluid van golven die op de kust rollen... Elke golf spoelt je zorgen en stress weg... ... Voel het warme zand dat je lichaam ondersteunt... De zachte zeebries die je huid streelt... Je bent hier volledig veilig en vredig... ... Met elke golf die binnenkomt... voel je je slaperig... meer ontspannen... De oceaan zingt je in slaap......",
        
        bodyRelaxation: "Laat nu de golven over je lichaam spoelen... Begin met je voeten... Voel hoe ze zo zwaar worden als nat zand... De golven stromen omhoog door je benen... maken ze volledig ontspannen en zwaar... ... Het zachte water stroomt over je heupen en onderrug... Alle spanning smelt weg zoals zand dat glad wordt gemaakt door het getij... Je armen drijven vredig... zwaar en ontspannen... ... Voel de golven over je borst spoelen... je schouders... je nek... Je gezicht wordt zacht en vredig... volledig ontspannen......",
        
        affirmations: "Met elke golf weet je... Je bent veilig en beschermd... De oceaan houdt je zachtjes vast... Je bent in perfecte vrede... ... Je lichaam is klaar voor diepe... rustgevende slaap... De golven dragen al je zorgen weg... Morgen brengt nieuwe mogelijkheden... ... Op dit moment is er alleen vrede... alleen rust... alleen het zachte geluid van golven......",
        
        closing: "Blijf hier rusten op dit vredige strand... De golven zetten hun zachte ritme voort... wiegen je in slaap... ... Laat het geluid van de oceaan je meenemen naar prachtige dromen... Slaap diep... Rust volledig... En word verfrist wakker als de dageraad over de oceaan... Welterusten......"
      }
    ],

    stress: [
      {
        name: "Mindfulness Stressverlichting",
        intro: "Welkom bij deze stressverlichting meditatie... Ga comfortabel zitten... je rug recht maar niet stijf... Plaats je voeten plat op de grond... voel de vloer onder je... Leg je handen zachtjes op je schoot... En wanneer je er klaar voor bent... sluit je ogen of laat je blik zachtjes naar beneden gaan...",
        
        breathing: "Laten we beginnen met een paar diepe... zuiverende ademhalingen... Adem in door je neus... vul je longen volledig... En adem uit door je mond... laat alle spanning los... ... Nogmaals... adem diep in... voel je borst en buik uitzetten... En adem uit... laat stress en zorgen los... Nog een keer... adem frisse... kalmerende energie in... En adem alles uit wat je niet meer dient......",
        
        bodyAwareness: "Breng nu je aandacht naar je lichaam... Merk plaatsen op waar je spanning vasthoudt... Misschien in je schouders... je kaak... je buik... ... Probeer niets te veranderen... merk deze gevoelens gewoon op... Erken ze met vriendelijkheid... ... Stel je nu voor dat je inademt in deze gespannen gebieden... Met elke inademing stuur je adem en ruimte naar de spanning... Met elke uitademing voel je de strakheid zachter worden... ... Ga door met deze zachte ademhaling... in... creëer ruimte... uit... laat spanning los......",
        
        mindfulness: "Laat je aandacht rusten in het huidige moment... Merk het gevoel van je adem die in en uit gaat... Het zachte op en neer van je borst... ... Wanneer gedachten over je dag opkomen... en dat zullen ze doen... merk ze gewoon op zonder oordeel... Zoals wolken die door de lucht trekken... Laat ze voorbij drijven... ... Keer terug naar je adem... Dit is je anker... Altijd beschikbaar... Altijd aanwezig... ... Er is nu niets dat je hoeft uit te zoeken... Geen problemen om op te lossen... Gewoon deze ademhaling... dan de volgende......",
        
        visualization: "Stel je een warm... gouden licht boven je hoofd voor... Dit is het licht van vrede en rust... Met elke ademhaling stroomt dit licht naar beneden door je lichaam... ... Het stroomt door je hoofd... lost mentale spanning op... Naar beneden door je nek en schouders... smelt stress weg... Door je borst... kalmeert je hart... Naar beneden door je armen tot je vingertoppen... ... Het gouden licht gaat verder door je buik... kalmeert elke angst... Naar beneden door je heupen en benen... aard je... Helemaal tot je tenen... ... Je bent nu gevuld met dit vredige... gouden licht......",
        
        closing: "Terwijl we deze meditatie beëindigen... Weet dat dit gevoel van rust altijd beschikbaar is... Slechts een paar ademhalingen ver weg... ... Begin je vingers en tenen te bewegen... Rol je schouders zachtjes... En wanneer je er klaar voor bent... open langzaam je ogen... ... Neem een moment om te voelen hoe je je voelt... Neem deze vrede mee terwijl je verder gaat met je dag... Onthoud... je kunt altijd terugkeren naar dit rustige centrum wanneer je dat nodig hebt... Dank je dat je deze tijd voor jezelf hebt genomen......"
      },
      
      {
        name: "Lichaamsscan Stressverlichting",
        intro: "Welkom bij deze lichaamsscan meditatie voor stressverlichting... Deze oefening helpt je systematisch spanning los te laten die door je lichaam vastgehouden wordt... Zoek een comfortabele positie... Sluit je ogen en bereid je voor om met bewustzijn en medeleven door je lichaam te reizen...",
        
        breathing: "Begin met drie diepe... bevrijdende ademhalingen... Adem in door je neus... vul je lichaam met kalmerende energie... Adem uit door je mond... laat de stress van de dag los... ... Voel je lichaam beginnen te ontspannen... Je ademhaling wordt dieper en natuurlijker... Elke uitademing draagt spanning weg... Elke inademing brengt vrede......",
        
        headAndNeck: "Begin met je aandacht naar de bovenkant van je hoofd te brengen... Merk spanning of strakheid op... Adem in dit gebied... Stuur ontspanning naar je hoofdhuid... ... Verplaats je aandacht naar je voorhoofd... Vaak houden we hier stress vast... Laat je voorhoofd glad en ontspannen worden... ... Merk je ogen op... Laat ze zacht worden... Je kaak... Laat deze ontgrendelen en ontspannen... Voel je hele gezicht vredig worden......",
        
        shouldersAndArms: "Focus nu op je nek... Dit gebied draagt vaak het gewicht van onze stress... Adem in je nek... Laat deze langer worden en zachter... ... Breng je aandacht naar je schouders... Merk op of ze opgetrokken zijn naar je oren... Laat ze naar beneden vallen... Voel de opluchting terwijl ze loslaten... ... Je armen... Laat ze zwaar en ontspannen worden... Je handen... Laat ze vredig rusten... Alle spanning stroomt weg door je vingertoppen......",
        
        torsoAndCore: "Focus op je borst... Soms maakt stress dat onze borst zich strak voelt... Adem in je borst... Laat deze uitzetten en ontspannen... ... Je hart... Stuur het liefde en waardering... Het heeft hard gewerkt... Laat het rusten in vrede... ... Je buik... Hier houden we vaak emotionele spanning vast... Adem in je buik... Laat deze zacht worden en loslaten... ... Je rug... Laat deze ondersteund worden... Alle lasten die je draagt... laat ze gaan......",
        
        lowerBodyRelease: "Breng je aandacht naar je heupen... Laat ze settelen en ontspannen... ... Je benen... Laat ze zwaar en los worden... Voel de stress naar beneden stromen door je benen... ... Je voeten... Laat ze volledig ontspannen... Voel alle spanning je lichaam verlaten door je voeten... stromend in de aarde... ... Je hele lichaam is nu ontspannen en in vrede......",
        
        integration: "Neem een moment om je hele lichaam te voelen... Ontspannen... vredig... vrij van spanning... ... Merk op hoe anders je je voelt wanneer stress wordt losgelaten... Dit is je lichaam's natuurlijke staat... Onthoud dit gevoel... Je kunt er altijd naar terugkeren wanneer je dat nodig hebt... ... Adem deze vrede in... Adem eventuele resterende spanning uit......",
        
        closing: "Terwijl we deze lichaamsscan voltooien... Weet dat je de kracht hebt om stress op elk moment los te laten... Adem gewoon in spanning en laat het gaan... ... Begin langzaam je vingers en tenen te bewegen... Wanneer je er klaar voor bent... open je ogen... Neem deze ontspanning mee naar je dag... Je bent kalm... Je bent in vrede... Je hebt controle over je stressreactie..."
      },
      
      {
        name: "Ademhaling voor Stressverlichting",
        intro: "Welkom bij deze ademmeditatie voor stressverlichting... Wanneer we gestrest zijn... wordt onze ademhaling oppervlakkig en snel... Deze oefening helpt je je adem te gebruiken om je lichaam's natuurlijke ontspanningsreactie te activeren... Zoek een comfortabele positie en sluit je ogen...",
        
        breathAwareness: "Begin met gewoon je adem op te merken... Probeer het niet te veranderen... Observeer gewoon... Merk op waar je je adem het duidelijkst voelt... Misschien bij je neusgaten... of in je borst... of je buik... ... Kijk gewoon even naar je adem... Dit is je levenskracht... Altijd beschikbaar... Altijd ondersteunend......",
        
        deepBreathing: "Nu gaan we je ademhaling verdiepen... Leg één hand op je borst en één op je buik... Terwijl je inademt... voel je buik uitzetten... Dit is diepe... diafragmatische ademhaling... ... Adem langzaam in door je neus... voel je buik omhoog komen... Adem uit door je mond... voel je buik naar beneden gaan... ... Ga door met deze diepe ademhaling... In door de neus... Uit door de mond... Elke ademhaling laat stress los......",
        
        countedBreathing: "Laten we nu tellen toevoegen om je adem te reguleren... Adem in gedurende vier tellen... één... twee... drie... vier... Houd vast gedurende vier... één... twee... drie... vier... Adem uit gedurende zes... één... twee... drie... vier... vijf... zes... ... De langere uitademing helpt je ontspanningsreactie te activeren... Ga door met dit patroon... In gedurende vier... Vasthouden gedurende vier... Uit gedurende zes... Voel je zenuwstelsel kalmeren met elke ademhaling......",
        
        breathVisualization: "Terwijl je doorgaat met dit adempatroon... Stel je voor dat je kalmerende... koele lucht inademt... Deze lucht draagt vrede en rust... ... Terwijl je uitademt... stel je voor dat je hete... gespannen lucht loslaat... Deze lucht draagt je stress en zorgen weg... ... In... koele... kalmerende lucht... Uit... hete... stressvolle lucht... ... Met elke cyclus word je meer ontspannen... meer in vrede......",
        
        affirmations: "Terwijl je ademt... herhaal deze affirmaties stil... 'Ik ben kalm'... Adem in... 'Ik ben in vrede'... Adem uit... ... 'Ik laat alle stress los'... Adem in... 'Ik heb controle'... Adem uit... ... 'Ik ben veilig'... Adem in... 'Ik ben ontspannen'... Adem uit... ... Ga door met alle affirmaties die goed voelen voor jou......",
        
        integration: "Laat nu je ademhaling terugkeren naar normaal... Maar merk op hoe anders het voelt... Dieper... meer ontspannen... natuurlijker... ... Onthoud... je adem is altijd bij je... Wanneer je je gestrest voelt... kun je altijd terugkeren naar deze rustige ademhaling... ... Neem een moment om dit hulpmiddel te waarderen dat je altijd bij je draagt......",
        
        closing: "Terwijl we deze ademmeditatie beëindigen... Weet dat je toegang hebt gekregen tot je lichaam's natuurlijke stressverlichting systeem... Je adem is je constante metgezel... altijd klaar om je te helpen rust te vinden... ... Neem drie meer diepe ademhalingen... Beweeg je vingers en tenen... Wanneer je er klaar voor bent... open je ogen... Je bent kalm... Je bent gecentreerd... Je bent in vrede..."
      }
    ],

    focus: [
      {
        name: "Ademanker Focus",
        intro: "Welkom bij deze focus en concentratie meditatie... Ga comfortabel zitten met je ruggengraat lang en alert... Leg je handen op je knieën of in je schoot... Neem even de tijd om een intentie te stellen voor helderheid en focus... Wanneer je er klaar voor bent... sluit zachtjes je ogen...",
        
        breathing: "Begin met drie diepe... energieke ademhalingen... Adem in door je neus... vul je longen met frisse lucht... En adem volledig uit door je mond... ... Nogmaals... adem diep in... voel je alert en wakker... Adem volledig uit... laat mentale waas los... Nog een keer... adem helderheid in... adem afleiding uit... ... Laat je ademhaling nu terugkeren naar normaal... maar houd je aandacht bij elke ademhaling......",
        
        anchorPractice: "We gaan je adem gebruiken als anker voor je aandacht... Focus op het gevoel van lucht die je neusgaten binnenkomt... Koel bij het inademen... Warm bij het uitademen... ... Houd je aandacht precies bij het puntje van je neus... Waar je de adem het eerst voelt... ... Wanneer je geest afdwaalt... en dat zal gebeuren... merk gewoon op waar hij naartoe ging... Breng dan zachtjes... zonder oordeel... je aandacht terug naar de adem... Dit is de oefening... Opmerken... Terugkeren... Keer op keer......",
        
        countingMeditation: "Om je focus verder aan te scherpen... voegen we tellen toe... Bij je volgende inademing... tel mentaal 'één'... Bij de uitademing... tel 'twee'... Inademen... 'drie'... Uitademen... 'vier'... ... Ga door met tellen tot tien... Begin dan weer bij één... ... Als je de tel kwijtraakt... geen probleem... Begin gewoon weer bij één... Dit traint je geest om aanwezig en gefocust te blijven... ... Één... twee... drie... vier... behoud gestage aandacht......",
        
        visualization: "Stel je nu een helder lichtpunt voor in het centrum van je voorhoofd... Dit is je focuspunt... Zie het duidelijk voor je geestesoog... ... Dit licht vertegenwoordigt je geconcentreerde aandacht... Merk op hoe het helderder en stabieler wordt terwijl je focus... ... Afleidende gedachten zijn zoals schaduwen... Ze kunnen dit heldere... stabiele licht niet beïnvloeden... Je focus blijft helder en sterk... ... Voel je geest scherper worden... alerter... klaar voor welke taak dan ook......",
        
        affirmations: "Herhaal deze affirmaties voor focus mentaal... 'Mijn geest is helder en scherp'... ... 'Ik ben volledig aanwezig en bewust'... ... 'Mijn concentratie is sterk en stabiel'... ... 'Ik focus met gemak en helderheid'... ... Laat deze woorden diep in je bewustzijn zinken......",
        
        closing: "Terwijl we deze meditatie voltooien... Voel de verbeterde helderheid in je geest... Je verbeterde vermogen om te focussen... ... Begin je ademhaling te verdiepen... Beweeg je vingers en tenen... En wanneer je er klaar voor bent... open je ogen... ... Merk op hoe alert en gefocust je je voelt... Je geest is helder... scherp en klaar... Neem deze gerichte aandacht mee naar je volgende activiteit... Je bent voorbereid om met precisie en helderheid te werken......"
      },
      
      {
        name: "Laserstraal Concentratie",
        intro: "Welkom bij deze intense focus meditatie... We gaan je concentratie trainen als een laserstraal... eenpuntig... helder... en krachtig... Ga zitten met je ruggengraat recht... voeten stevig op de grond... ogen gesloten maar alert...",
        
        preparation: "Stel je voor dat je geest een vergrootglas is... dat zonlicht kan bundelen tot een krachtige... gerichte straal... Vandaag train je die vaardigheid... ... Neem drie scherpe... energieke ademhalingen... Bij elke ademhaling word je alerter... scherper... meer gefocust... ... Voel energie samenkomen in het centrum van je voorhoofd... Dit wordt je focuspunt......",
        
        singlePointed: "Kies één enkel punt om op te focussen... Dit kan het gevoel van je adem zijn... het geluid van je hart... of een visualisatie van een heldere vlam... ... Wat je ook kiest... houd je volledige aandacht erop gericht... Als een laserstraal... smal... intens... onwrikbaar... ... Wanneer je geest probeert af te dwalen... en dat zal gebeuren... breng hem meteen terug... Geen zachte terugkeer... maar een sterke... besliste redirectie......",
        
        intensification: "Maak je focus nu nog scherper... Stel je voor dat je kunt inzoomen op je gekozen punt... Als je focust op adem... zoom in op één neusgat... Als je focust op geluid... zoom in op één specifieke toon... ... Voel de intensiteit van je concentratie toenemen... Je geest wordt een fijn afgestelde... precisie instrument... Elke seconde van gefocuste aandacht maakt je sterker......",
        
        distractionTraining: "Nu gaan we je weerstand tegen afleiding trainen... Sta toe dat gedachten... geluiden... sensaties opkomen... Maar laat ze je focus niet verstoren... ... Je bent zoals een rots in de branding... Golven van afleiding kunnen tegen je aanslaan... maar je blijft stabiel... onbeweeglijk... gefocust... ... Elke keer dat je weerstand biedt aan afleiding... word je mentale spier sterker......",
        
        laserVisualization: "Visualiseer nu een heldere... blauwe laserstraal die uitstraalt van je voorhoofd... Deze straal vertegenwoordigt je geconcentreerde aandacht... ... Zie hoe stabiel en krachtig deze straal is... Hij snijdt door alle afleiding heen... direct naar je doel... ... Voel hoe deze laserstraal je mentale kracht vertegenwoordigt... Je vermogen om te focussen op wat echt belangrijk is......",
        
        affirmations: "Versterk je focus met deze krachtige affirmaties... 'Mijn geest is een laserstraal van concentratie'... 'Ik ben de meester van mijn aandacht'... 'Niets kan mijn focus verstoren'... 'Ik ben mentaal onverslaanbaar'... ... Voel deze woorden je geest scherpte geven... zoals slijpen een mes scherp maakt......",
        
        closing: "Je hebt zojuist je mentale focus getraind als een atleet... Je geest is nu scherper... sterker... meer gericht... ... Onthoud dit gevoel van intense concentratie... Dit is je natuurlijke vermogen... altijd beschikbaar wanneer je het nodig hebt... ... Open je ogen met laserstraal focus... Klaar om elke taak aan te pakken met absolute precisie en controle..."
      },
      
      {
        name: "Bergstabiele Concentratie",
        intro: "Welkom bij deze berg-geïnspireerde focus meditatie... We gaan je concentratie opbouwen met de stabiliteit van een eeuwenoude berg... onwrikbaar... kalm... en betrouwbaar... Ga comfortabel zitten en voel je verbinding met de aarde...",
        
        bergConnection: "Stel je voor dat je zit als een berg... Je basis is breed en diep geworteld in de aarde... Je ruggengraat rijst op als een bergpiek... stabiel en majestueus... ... Voel deze berg-energie in je lichaam... Zwaar... stabiel... onbeweeglijk... Storms kunnen komen en gaan... maar jij blijft onveranderd......",
        
        breathMountain: "Je adem wordt nu de wind die rond de berg waait... Soms zacht en kalm... soms sterker... maar de berg blijft altijd stabiel... ... Focus op het natuurlijke ritme van je adem... zonder het te veranderen... Gewoon observeren... zoals een berg observeert zonder oordeel... ... Je bent zowel de berg als de observeerder... stabiel en bewust......",
        
        weatherPatterns: "Gedachten en emoties zijn zoals weerspatronen rond de berg... Soms zijn er heldere... zonnige momenten... Soms wolken van verwarring... Soms storms van sterke emoties... ... Maar de berg blijft altijd hetzelfde... Onbeïnvloed door het weer... Jij bent die berg... Stabiel... rustig... gefocust ondanks alle mentale 'weer'......",
        
        rootedFocus: "Voel je focus geworteld zijn in de aarde... zoals boomwortels die diep groeien... Hoe dieper je wortels... hoe stabieler je concentratie... ... Elke keer dat je merkt dat je afdwaalt... stel je voor dat je je wortels dieper laat groeien... Groundende je aandacht steeds steviger... ... Dit is gefocust zijn zonder spanning... Stabiel zonder star te zijn......",
        
        peakClarity: "Van de top van je berg-bewustzijn... heb je een helder overzicht... Je kunt alles zien... maar niets verstoort je vrede... ... Je focus is nu panoramisch... breed genoeg om alles waar te nemen... maar stabiel genoeg om niet afgeleid te worden... ... Dit is echte concentratie... ruim en stabiel tegelijk......",
        
        closing: "Neem deze berg-stabiliteit mee naar je dag... Weet dat je altijd kunt terugkeren naar deze innerlijke berg... ... Wanneer je je overweldigd voelt... herinner je deze stabiliteit... Je bent de berg... onveranderlijk... vredig... gefocust... ... Open je ogen en voel je geworteld... stabiel... en helder klaar voor wat komen gaat..."
      }
    ],

    anxiety: [
      {
        name: "Grounding Angstverlichting",
        intro: "Welkom bij deze angstverlichting meditatie... Zoek een comfortabele positie waar je je ondersteund en veilig voelt... Je kunt één hand op je hart leggen en één op je buik... Dit helpt je gegrond en verbonden met jezelf te voelen... Neem even de tijd om hier volledig aan te komen...",
        
        grounding: "Laten we beginnen met onszelf te gronden in het huidige moment... Voel je voeten op de grond... of je lichaam in de stoel... Merk vijf dingen op die je nu kunt voelen... De temperatuur van de lucht... De textuur van je kleding... Het gewicht van je lichaam... ... Dit is echt... Dit is nu... Je bent veilig in dit moment......",
        
        breathing: "Laten we nu een kalmerend adempatroon gebruiken... Adem langzaam in gedurende vier tellen... één... twee... drie... vier... Houd zachtjes vast gedurende vier... één... twee... drie... vier... En adem langzaam uit gedurende zes... één... twee... drie... vier... vijf... zes... ... Deze langere uitademing activeert je lichaam's ontspanningsreactie... Nogmaals... in gedurende vier... vasthouden gedurende vier... uit gedurende zes... ... Ga door met dit rustgevende ritme... voel je kalmer worden met elke cyclus......",
        
        bodyRelease: "Scan je lichaam op gebieden van spanning of angst... Je merkt misschien strakheid in je borst... vlinders in je maag... spanning in je schouders... ... Dat is oké... Dit is je lichaam dat probeert je te beschermen... Bedank het voor het zorgen voor je veiligheid... ... Stel je nu voor dat je inademt in deze gebieden... Stuur ze medeleven en warmte... Met elke uitademing... laat de angst een beetje zachter worden... Je hoeft niets te forceren... Sta het gewoon toe......",
        
        visualization: "Stel je voor dat je op een plek bent waar je je volledig veilig en kalm voelt... Dit kan een gezellige kamer zijn... een vredig strand... een stil bos... waar het voor jou goed voelt... ... Merk alle details van deze veilige plek op... De kleuren... de geluiden... de geuren... de texturen... ... Voel jezelf dieper ontspannen in dit toevluchtsoord... Hier kan niets je kwaad doen... Je bent beschermd en in vrede... ... Als angstige gedachten opkomen... stel je voor dat het bladeren zijn die voorbij drijven op een zachte stroom... Je kunt ze observeren zonder meegesleept te worden......",
        
        affirmations: "Laten we onszelf wat kalmerende affirmaties geven... 'Ik ben veilig in dit moment'... ... 'Dit gevoel zal voorbijgaan'... ... 'Ik heb angst eerder overleefd... en ik zal het weer overleven'... ... 'Ik ben sterker dan mijn angst'... ... 'Vrede is mijn natuurlijke staat'... ... 'Ik kies voor rust'......",
        
        closing: "Terwijl we deze meditatie beëindigen... Onthoud dat je deze hulpmiddelen altijd beschikbaar hebt... Je adem... Je veilige plek... Je innerlijke kracht... ... Begin je lichaam zachtjes te bewegen... Misschien een beetje rekken... Neem een diepe ademhaling en open langzaam je ogen... ... Merk elke verandering in hoe je je voelt op... Zelfs een kleine verandering is significant... Wees zacht voor jezelf terwijl je terugkeert naar je dag... Je bent moedig... Je bent capabel... En je bent niet alleen......"
      },
      
      {
        name: "Hart-Gecentreerde Kalmte",
        intro: "Welkom bij deze hart-gecentreerde meditatie voor angst... Leg één hand op je hart en voel de warmte... Dit is je centrum van kalmte en wijsheid... We gaan je leren verbinden met de natuurlijke vrede van je hart...",
        
        heartConnection: "Voel de warmte van je hand op je hart... Merk de zachte... regelmatige klop van je hartslag... Dit hart heeft je door alles heen gedragen... het is je trouwe metgezel... ... Adem langzaam en diep... stel je voor dat je rechtstreeks naar je hart ademt... Met elke ademhaling wordt je hart zachter... opener... vriendelijker naar jezelf......",
        
        heartBreathing: "We gaan nu hart-gecentreerd ademhalen... Adem in naar je hart gedurende vier tellen... Voel je hart uitzetten met liefde... Houd een moment vast... Adem uit vanuit je hart gedurende zes tellen... Stuur kalmte naar elke cel... ... Met elke hartslag... met elke ademhaling... voel je veiliger... meer geliefd... meer in vrede met jezelf......",
        
        selfCompassion: "Vanuit je hart... stuur jezelf medeleven... Zoals je zou doen voor een dierbare vriend die angstig is... Zeg tegen jezelf... 'Het is oké om angstig te zijn'... 'Ik ben menselijk en soms voelen mensen zich angstig'... 'Ik ben waardig van liefde en begrip'... ... Voel hoe je hart zich opent voor jezelf... Je bent je eigen beste vriend......",
        
        heartShield: "Stel je voor dat je hart een beschermend schild van licht uitstraalt... Dit licht omhult je hele lichaam... Niets kwaadaardigs kan dit licht binnendringen... ... Je bent veilig binnen deze hart-energie... Zelfs als angst probeert binnen te komen... wordt het getransformeerd door liefde... Je hart is machtiger dan angst......",
        
        lovingPresence: "Voel de aanwezigheid van alle mensen die ooit van je gehouden hebben... Ouders... vrienden... familie... leraren... Zelfs als ze er fysiek niet zijn... hun liefde leeft in je hart... ... Je bent nooit alleen... Je bent omringd door een onzichtbare cirkel van liefde... Deze liefde beschermt je... troost je... geeft je moed......",
        
        heartWisdom: "Je hart bevat diepe wijsheid... Stel het een vraag over je angst... Luister niet met je hoofd... maar met je hart... Wat wil je hart dat je weet?... ... Misschien is het... 'Je bent veiliger dan je denkt'... Of... 'Dit gevoel zal voorbijgaan'... Vertrouw de zachte stem van je hart......",
        
        closing: "Terwijl we deze hart meditatie afsluiten... Weet dat je hart altijd beschikbaar is als toevluchtsoord... Leg gewoon je hand erop en voel de liefde... ... Je hart is je thuisbasis... je centrum van kalmte... Je kunt er altijd naar terugkeren... Nu en altijd... Je bent geliefd... Je bent veilig... Je bent heel..."
      },
      
      {
        name: "5-4-3-2-1 Grounding Techniek",
        intro: "Welkom bij deze grounding meditatie voor angst... Wanneer angst ons overweldigt... kan het helpen om terug te keren naar onze zintuigen... naar het hier en nu... Deze techniek brengt je direct terug naar het huidige moment...",
        
        preparation: "Ga comfortabel zitten... voeten plat op de grond... Neem drie diepe ademhalingen... Met elke uitademing laat je lichaam een beetje meer ontspannen... We gaan nu je zintuigen gebruiken om je te gronden in dit moment......",
        
        fiveThings: "Kijk om je heen en identificeer VIJF dingen die je kunt zien... Zeg ze hardop of in gedachten... 'Ik zie een deur... Ik zie mijn handen... Ik zie licht... Ik zie een muur... Ik zie schaduwen...' ... Neem de tijd om elk object echt te bekijken... Merk details op... kleuren... vormen... texturen......",
        
        fourThings: "Nu identificeer VIER dingen die je kunt voelen... 'Ik voel mijn voeten op de grond... Ik voel de stoel tegen mijn rug... Ik voel de lucht op mijn huid... Ik voel mijn kleding...' ... Concentreer je volledig op deze fysieke sensaties... Dit is je lichaam in dit moment... echt en stabiel......",
        
        threeThings: "Luister en identificeer DRIE dingen die je kunt horen... 'Ik hoor mijn ademhaling... Ik hoor verkeer buiten... Ik hoor het zoemen van een apparaat...' ... Luister echt... zelfs naar de stilte tussen geluiden... Deze geluiden ankeren je in het nu......",
        
        twoThings: "Merk TWEE dingen op die je kunt ruiken... 'Ik ruik de lucht in deze kamer... Ik ruik een zweem van parfum...' ... Als je niets specifieks ruikt... merk gewoon de kwaliteit van de lucht op... Frisse lucht... warme lucht... neutrale lucht......",
        
        oneThing: "Ten slotte... één ding dat je kunt proeven... Misschien de smaak van iets dat je recent gedronken hebt... of gewoon de neutrale smaak van je mond... ... Dit is je smaakzintuig... aanwezig in dit moment......",
        
        integration: "Merk op hoe je je nu voelt... Meer gegrond... meer verbonden met dit moment... Minder in je hoofd... meer in je lichaam... ... Dit is het verschil tussen angst (vaak over de toekomst) en het huidige moment (waar je veilig bent)......",
        
        closing: "Je hebt zojuist een krachtige techniek geleerd... 5-4-3-2-1... Gebruik dit wanneer angst je probeert mee te nemen naar zorgen over de toekomst... Kom terug naar je zintuigen... naar dit moment... naar de veiligheid van het nu... Deze techniek gaat altijd met je mee..."
      }
    ],

    energy: [
      {
        name: "Gouden Zon Energie",
        intro: "Welkom bij deze energiegevende meditatie... Ga zitten of staan in een positie die sterk en alert voelt... Stel je een touwtje voor dat je omhoog trekt vanaf de kruin van je hoofd... Voel je ruggengraat langer worden... je borst openen... Je staat op het punt je natuurlijke vitaliteit te wekken...",
        
        breathing: "Laten we beginnen met energieke ademhalingen... Neem een diepe ademhaling door je neus... vul je hele lichaam met frisse energie... En adem krachtig uit door je mond met een 'HA' geluid... laat alle vermoeidheid los... ... Nogmaals... adem vitaliteit en levenskracht in... En adem 'HA' uit... laat traagheid los... Nog een keer... adem kracht en energie in... Adem 'HA' uit... voel je wakkerder worden......",
        
        bodyAwakening: "Laten we nu je lichaam's energie wekken... Begin met je handpalmen krachtig tegen elkaar te wrijven... Voel de warmte en energie opbouwen... Leg je warme handpalmen even over je ogen... ... Tik nu zachtjes over je hele schedel met je vingertoppen... Wek je geest... Masseer je slapen in kleine cirkels... ... Rol je schouders naar achteren... voel je borst openen en uitzetten... Draai je ruggengraat zachtjes links en rechts... Voel energie door je kern stromen......",
        
        energyVisualization: "Stel je een heldere gouden zon voor in het centrum van je borst... Dit is je innerlijke energiebron... Met elke ademhaling wordt deze zon helderder en groter... ... Voel zijn warme stralen door je hele lichaam verspreiden... Omhoog door je borst en schouders... Naar beneden door je armen tot je vingertoppen... die tintelen van energie... ... Het gouden licht stroomt omhoog door je keel en hoofd... Je geest wordt helder en alert... Naar beneden door je buik en heupen... Door je benen... aard je terwijl het je energie geeft... ... Je hele lichaam gloeit met levendige levenskracht......",
        
        affirmations: "Laten we je energie activeren met krachtige affirmaties... 'Ik ben gevuld met levendige energie'... ... 'Mijn lichaam is sterk en levend'... ... 'Ik heb alle energie die ik nodig heb voor mijn dag'... ... 'Ik ben gemotiveerd en klaar voor actie'... ... 'Energie stroomt vrij door me heen'... ... Voel deze woorden elke cel van je lichaam opladen......",
        
        activation: "Laten we deze energie nu verzegelen... Neem drie diepe ademhalingen... maak elke groter dan de vorige... Eerste ademhaling... voel energie opbouwen... Tweede ademhaling... energie uitzetten... Derde ademhaling... houd vast aan de top... voel de energie door je heen pulseren... En laat los met een glimlach... ... Voel je ogen helder en alert... Je geest scherp en gefocust... Je lichaam geënergiseerd en klaar......",
        
        closing: "Terwijl we deze energiegevende meditatie voltooien... Voel de vitaliteit door je aderen stromen... Je bent wakker... alert en volledig opgeladen... ... Begin je lichaam te bewegen zoals het goed voelt... Misschien je armen boven je hoofd strekken... Je nek rollen... Zachtjes op je tenen stuiteren... ... Wanneer je er klaar voor bent... open je ogen wijd... Neem de wereld in met frisse energie... Je bent klaar om je dag met enthousiasme en kracht te omarmen... Ga vooruit en laat je licht schijnen......"
      }
    ],

    mindfulness: [
      {
        name: "Huidig Moment Bewustzijn",
        intro: "Welkom bij deze mindfulness meditatie... Zoek een comfortabele positie waar je alert en op je gemak kunt zitten... Deze praktijk gaat over het cultiveren van bewustzijn van het huidige moment... Er is nergens naartoe te gaan en niets te bereiken... gewoon hier zijn nu...",
        
        breathing: "Laten we beginnen door onszelf te verankeren in de adem... Merk je natuurlijke ademritme op... verander niets... observeer alleen... ... Voel de lucht die door je neusgaten binnenkomt... de korte pauze... en de zachte loslating... ... Je adem gebeurt altijd in het huidige moment... Gebruik het als je anker naar het hier en nu... Wanneer je geest afdwaalt... keer gewoon terug naar de adem... geen oordeel... gewoon zachtjes terugkeren......",
        
        bodyAwareness: "Breid nu je bewustzijn uit om je lichaam te omvatten... Merk op hoe je zit... Voel de contactpunten waar je lichaam het oppervlak raakt... ... Scan door je lichaam met zachte nieuwsgierigheid... Welke sensaties zijn er nu aanwezig?... Misschien warmte... koelte... spanning... ontspanning... ... Merk gewoon op wat er is... zonder iets te proberen te veranderen... Je lichaam is een poort naar aanwezigheid......",
        
        thoughtAwareness: "Terwijl we doorgaan... merk eventuele gedachten op die opkomen... In plaats van verstrikt te raken in het verhaal... kijk of je gedachten kunt observeren zoals wolken die door de lucht van je geest trekken... ... Sommige gedachten zijn licht en ijl... andere kunnen zware onweerswolken zijn... Alle zijn welkom... alle zullen voorbijgaan... ... Je bent niet je gedachten... je bent de bewuste ruimte waarin gedachten verschijnen en verdwijnen......",
        
        presentMoment: "Op dit moment... in dit exacte moment... is alles precies zoals het is... Er is diepe vrede in het accepteren van wat hier is... zonder weerstand... ... Luister naar de geluiden om je heen... merk op dat ze vers opkomen in elk moment... ... Voel de levendigheid in je lichaam... de energie van hier zijn... nu... ... Dit moment is het enige moment dat ooit bestaat... en het vernieuwt zichzelf constant......",
        
        affirmations: "Laat deze woorden in je bewustzijn bezinken... 'Ik ben aanwezig'... ... 'Ik ben hier nu'... ... 'Dit moment is genoeg'... ... 'Ik ben bewust en wakker'... ... 'Vrede wordt gevonden in aanwezigheid'...",
        
        closing: "Terwijl we deze praktijk afsluiten... neem een moment om te waarderen dat je jezelf het geschenk van aanwezigheid hebt gegeven... ... Merk op hoe je je voelt na tijd door te brengen in mindful bewustzijn... ... Wanneer je er klaar voor bent... open langzaam je ogen als ze gesloten waren... ... Kijk of je deze kwaliteit van aanwezigheid met je mee kunt nemen... naar je volgende activiteit... en door je dag heen... Het huidige moment is altijd beschikbaar... wacht altijd op je terugkeer......"
      }
    ],

    compassion: [
      {
        name: "Liefdesoefening voor het Hart",
        intro: "Welkom bij deze compassie meditatie... Ga comfortabel zitten en leg een hand op je hart... We gaan liefdevolle vriendelijkheid cultiveren... eerst voor jezelf... dan uitbreidend naar anderen... Dit is een oefening van het openen van het hart...",
        
        selfCompassion: "Begin door jezelf in gedachten te brengen... Stel je jezelf voor zoals je nu bent... Bekijk jezelf met vriendelijke ogen... zoals je zou kijken naar een dierbare vriend... ... Bied jezelf in stilte deze woorden van liefdevolle vriendelijkheid aan... 'Moge ik gelukkig zijn... Moge ik gezond zijn... Moge ik in vrede zijn... Moge ik met gemak leven...' ... Voel deze wensen in je hart... Merk eventuele weerstand op... en wees daar ook zachtaardig mee... Je verdient liefde... vooral van jezelf......",
        
        lovedOne: "Breng nu iemand in gedachten die je gemakkelijk liefhebt... een familielid... een goede vriend... een geliefd huisdier... Zie hun gezicht... voel je natuurlijke genegenheid voor hen... ... Stuur dezelfde liefdevolle wensen... 'Moge je gelukkig zijn... Moge je gezond zijn... Moge je in vrede zijn... Moge je met gemak leven...' ... Voel de warmte in je hart terwijl je hen liefde stuurt... Merk op hoe goed het voelt om iemand het beste toe te wensen......",
        
        neutral: "Denk nu aan iemand neutraals... misschien een kassière die je regelmatig ziet... een buur die je nauwelijks kent... iemand die noch vriend noch vijand is... ... Oefen dezelfde liefdevolle vriendelijkheid uit... 'Moge je gelukkig zijn... Moge je gezond zijn... Moge je in vrede zijn... Moge je met gemak leven...' ... Deze persoon wil gelukkig zijn net zoals jij... Ze hebben uitdagingen net zoals jij... Kijk of je kunt verbinden met hun gedeelde menselijkheid......",
        
        difficult: "Als je je er klaar voor voelt... breng iemand in gedachten met wie je moeite hebt... Begin met iemand mild uitdagend... niet de moeilijkste persoon in je leven... ... Dit kan moeilijk voelen... ga langzaam... 'Moge je gelukkig zijn... Moge je gezond zijn... Moge je in vrede zijn... Moge je met gemak leven...' ... Onthoud... hun geluk neemt niets weg van het jouwe... Gekwetste mensen kwetsen vaak anderen... Kun je medeleven vinden voor hun pijn?......",
        
        universal: "Breid tenslotte je bewustzijn uit om alle wezens overal te omvatten... Zie de aarde vanuit de ruimte... alle schepsels... alle mensen... worstelend en geluk zoekend... ... Met een open hart... bied deze universele liefdevolle vriendelijkheid aan... 'Mogen alle wezens gelukkig zijn... Mogen alle wezens gezond zijn... Mogen alle wezens in vrede zijn... Mogen alle wezens met gemak leven...' ... Voel jezelf als onderdeel van dit uitgebreide web van verbinding... liefde geven en ontvangen......",
        
        closing: "Leg je hand nog een keer op je hart... Voel de warmte daar... de liefde die je hebt gegenereerd... Deze liefdevolle vriendelijkheid leeft altijd in je... ... Onthoud... echte compassie omvat jezelf... Wees zachtaardig voor jezelf terwijl je door je dag gaat... ... Wanneer je anderen tegenkomt... kijk of je je deze hartverbinding kunt herinneren... Iedereen doet zijn best met wat ze hebben... Iedereen verdient liefde... beginnend met jou......"
      }
    ],

    walking: [
      {
        name: "Mindful Wandel Praktijk",
        intro: "Welkom bij deze wandelmeditatie... Je kunt deze oefening overal doen... binnen in een rustige ruimte... of buiten in de natuur... Begin met stil staan... voel je voeten op de grond... We gaan wandelen transformeren in een meditatie...",
        
        preparation: "Start door te staan met je voeten heupbreedte uit elkaar... Voel het contact tussen je voeten en de aarde... Merk je houding op... ruggengraat lang maar niet stijf... schouders ontspannen... armen natuurlijk hangend langs je zijden... ... Neem een paar diepe ademhalingen... arriveer volledig in je lichaam... in dit moment... Stel de intentie om met bewustzijn te wandelen... elke stap een meditatie......",
        
        firstSteps: "Begin langzaam je rechtervoet op te tillen... Merk de verschuiving van gewicht naar je linkervoet op... Voel het optillen... het bewegen... het plaatsen van je voet... ... Neem elke stap bewust... ongeveer de helft van je normale wandelsnelheid... Er is geen bestemming... geen haast... alleen de eenvoudige handeling van wandelen... ... Merk op hoe je lichaam natuurlijk balanceert... coördineert... beweegt door de ruimte... Verwonder je over dit alledaagse wonder......",
        
        breathAndSteps: "Coördineer nu je ademhaling met je stappen... Misschien twee stappen bij het inademen... twee stappen bij het uitademen... Vind een ritme dat natuurlijk voelt... ... Als je geest afdwaalt naar je bestemming of je to-do lijst... breng zachtjes de aandacht terug naar de fysieke sensatie van wandelen... Het gevoel van je voeten die de grond raken... optillen... vooruit bewegen......",
        
        awareness: "Breid je bewustzijn uit om je omgeving te omvatten... Als je buiten bent... merk de luchttemperatur op... eventuele bries... de geluiden van de natuur... vogels... ritselende bladeren... ... Als je binnen bent... wees bewust van de ruimte om je heen... de verlichting... de luchtkwaliteit... ... Blijf verbonden met de sensatie van wandelen terwijl je je omgeving in je opneemt... Wandelen als een dans tussen innerlijk bewustzijn en uiterlijke aanwezigheid......",
        
        gratitude: "Terwijl je blijft wandelen... breng waardering naar dit geweldige lichaam... Je benen die je dragen... je voeten die je ondersteunen... je balans die je stabiel houdt... ... Voel dankbaarheid voor je vermogen om door de wereld te bewegen... Niet iedereen heeft dit geschenk... Elke stap is een voorrecht... ... Merk op hoe wandelmeditatie een bewegend heiligdom creëert... vrede in beweging......",
        
        closing: "Kom geleidelijk tot stilstand... Sta een moment stil... Voel je voeten stevig op de grond... Merk eventuele sensaties in je lichaam op van dit mindful wandelen... ... Neem een moment om te waarderen dat je deze kwaliteit van bewustzijn kunt brengen naar elke beweging... Wandelen naar je auto... de trap op... door een kamer... ... Elke stap kan een gelegenheid zijn voor aanwezigheid... voor terugkeer naar het hier en nu... Neem dit wandelbewustzijn mee naar je dag......"
      }
    ],

    breathing: [
      {
        name: "Volledige Adem Praktijk",
        intro: "Welkom bij deze ademmeditatie... Zoek een comfortabele positie... zittend of liggend... Leg een hand op je borst... een op je buik... We gaan de volle kracht van bewuste ademhaling verkennen... Je adem is altijd beschikbaar... altijd klaar om je te centreren en te kalmeren...",
        
        naturalBreath: "Begin door gewoon je natuurlijke adem te observeren... Verander nog niets... merk alleen op... ... Voel welke hand meer beweegt... de borst of de buik... Merk het ritme op... de diepte... de pauzes tussen inademen en uitademen... ... Je adem weerspiegelt je huidige staat... en door je adem te veranderen... kun je veranderen hoe je je voelt... Dit is je superkracht......",
        
        bellyBreathing: "Laten we nu diepe buikademhaling oefenen... Bij je volgende inademing... adem naar beneden in je buik... Laat de hand op je buik omhoog gaan terwijl de borsthand relatief stil blijft... ... Adem langzaam uit... voel de buikhand omlaag gaan... Dit is hoe baby's natuurlijk ademen... diep... ontspannen... helend... ... Ga door met dit patroon... Inademen in de buik... volledig uitademen... Elke adem activeert je lichaam's ontspanningsreactie......",
        
        threePartBreath: "Nu gaan we de volledige driedelige adem verkennen... Adem eerst in je buik... breid dan je ribben uit... til tenslotte je borst op... ... Adem uit in omgekeerde volgorde... borst wordt zachter... ribben trekken samen... buik trekt naar binnen... ... Dit is zoals het vullen en legen van een ballon van onder naar boven... Compleet... voedend... balancerend... Neem je tijd voor elke fase......",
        
        countedBreath: "Laten we telling toevoegen om ritme en focus te creëren... Adem in gedurende vier tellen... één... twee... drie... vier... Houd zachtjes vast gedurende twee... één... twee... Adem uit gedurende zes... één... twee... drie... vier... vijf... zes... ... Dit patroon activeert je parasympathische zenuwstelsel... je rust en verteer reactie... Ga door in je eigen tempo... pas de tellingen aan indien nodig......",
        
        breathAwareness: "Merk op hoe je ademhaling je hele wezen beïnvloedt... Met elke bewuste adem... je zenuwstelsel komt tot rust... je geest wordt helder... je lichaam ontspant... ... Je adem is zoals een brug tussen je bewuste en onbewuste geest... tussen je lichaam en je geest... ... Voel de levenskracht... de prana... instromen met elke inademing... Stagnante energie vrijkomen met elke uitademing......",
        
        affirmations: "Met elke inademing... zeg in stilte 'Ik ben kalm'... Met elke uitademing... 'Ik ben in vrede'... ... Of kies je eigen woorden... 'Vrede inademen... spanning uitademen'... 'Helderheid inademen... verwarring uitademen'... ... Laat je adem deze intenties diep in elke cel van je lichaam dragen......",
        
        closing: "Terwijl we deze ademoefening voltooien... keer terug naar je natuurlijke ritme... Merk eventuele veranderingen op in hoe je je voelt... Misschien meer ontspannen... meer gecentreerd... meer aanwezig... ... Onthoud... je adem is altijd bij je... In momenten van stress... angst... of overweldiging... kun je terugkeren naar bewuste ademhaling... ... Neem drie laatste diepe ademhalingen... waardeer deze oude praktijk die altijd beschikbaar is... Je adem is je constante metgezel... je pad naar vrede......"
      }
    ],

    morning: [
      {
        name: "Dageraad Ontwaken Praktijk",
        intro: "Welkom bij deze ochtendmeditatie... Een mooie manier om je dag te beginnen... Ga comfortabel zitten... misschien bij een raam waar je het ochtendlicht kunt voelen... We gaan een positieve intentie zetten voor de komende dag... lichaam en geest ontwaken...",
        
        gratitude: "Begin door een moment te nemen om te waarderen dat je bent ontwaakt in een nieuwe dag... Een frisse start... nieuwe mogelijkheden... ... Breng drie dingen in gedachten waar je nu dankbaar voor bent... Misschien je comfortabele bed... het dak boven je hoofd... iemand van wie je houdt... ... Voel die dankbaarheid in je hart... Laat het uitbreiden... Deze waardering zet een positieve toon voor alles wat volgt......",
        
        bodyAwakening: "Laten we nu zachtjes je lichaam ontwaken... Rol je schouders naar achteren... voel je borst openen voor de nieuwe dag... ... Strek je armen boven je hoofd... reikend naar je hoogste potentieel... ... Neem een diepe geeuw als die komt... laat je lichaam overgaan van slaap naar wakkerte... ... Beweeg je vingers en tenen... voel de levenskracht stromen naar je extremiteiten... Je lichaam is klaar voor de dag......",
        
        breathingEnergy: "Laten we ademhaling gebruiken om zachte energie op te bouwen... Adem langzaam in... stel je voor dat je de frisse energie van de ochtend inademt... Adem uit... laat sufheid of vermoeidheid los... ... Met elke ademhaling... voel jezelf alerter worden... levendiger... meer aanwezig... ... Stel je het ochtendlicht voor... of je het kunt zien of niet... vul je lichaam met vitaliteit en helderheid......",
        
        intention: "Zet nu een intentie voor je dag... Geen to-do lijst... maar een manier van zijn... Hoe wil je vandaag verschijnen?... Met vriendelijkheid... met geduld... met vreugde... met aanwezigheid?... ... Kies een kwaliteit die je wilt belichamen... Laat het bezinken in je hart... ... Visualiseer jezelf door je dag bewegend met deze intentie... Uitdagingen ontmoeten met gratie... Verbinden met anderen vanuit deze gecentreerde plek......",
        
        visualization: "Zie je dag zich ontvouwen met gemak en flow... Belangrijke taken soepel voltooid... Interacties gevuld met warmte en begrip... Obstakels worden kansen voor groei... ... Je beweegt door je dag zoals een rivier... aanpasbaar... stromend rond uitdagingen... altijd je weg vindend... ... Voel jezelf aan het einde van de dag... tevreden... volbracht... in vrede......",
        
        affirmations: "Laten we wat positieve zaden planten voor de dag... 'Vandaag is vol mogelijkheden'... ... 'Ik heb alles wat ik nodig heb in mezelf'... ... 'Ik benader deze dag met nieuwsgierigheid en openheid'... ... 'Ik ben dankbaar voor deze kans om te leven en te groeien'... ... 'Ik kies vreugde en aanwezigheid in elk moment'... ... Voel deze woorden wortel schieten in je bewustzijn......",
        
        closing: "Terwijl we deze ochtendmeditatie voltooien... voel jezelf volledig wakker... alert... en klaar... ... Neem drie diepe ademhalingen... elk brengt je meer volledig in het huidige moment... ... Wanneer je je ogen opent... zie echt de wereld om je heen... Merk het licht op... de kleuren... de schoonheid die er altijd is... ... Neem dit gevoel van waardering en intentie met je mee... Je bent klaar om deze dag betekenisvol te maken... Stap vooruit met vertrouwen en vreugde......"
      }
    ]
  },

  // Spanish meditation templates
  es: {
    sleep: [
      {
        name: "Escaneo Corporal para Dormir",
        intro: "Bienvenido a esta meditación pacífica para dormir... Encuentra una posición cómoda en tu cama... permite que tu cuerpo se hunda en el colchón... Cierra los ojos suavemente y comienza a notar tu respiración... No hay nada que necesites hacer ahora... excepto relajarte y escuchar mi voz...",
        
        breathing: "Comencemos con algunas respiraciones calmantes... Respira lentamente por la nariz... cuenta hasta cinco... uno... dos... tres... cuatro... cinco... Mantén la respiración suavemente... uno... dos... tres... cuatro... cinco... Y ahora exhala lentamente por la boca... uno... dos... tres... cuatro... cinco... Deja que tu respiración regrese a su ritmo natural... sintiéndote más relajado con cada respiración......",
        
        bodyRelaxation: "Ahora haremos un suave escaneo corporal para liberar cualquier tensión... Comienza llevando tu atención a tus pies... Siente cómo se vuelven pesados y cálidos... Deja que esa pesadez fluya hacia arriba por tus tobillos... tus pantorrillas... tus rodillas... Siente tus piernas hundiéndose más profundamente en la cama... ... Ahora lleva tu atención a tus caderas y parte baja de la espalda... Deja que se ablanden y se liberen... Siente tu vientre subir y bajar con cada respiración... Tu pecho expandiéndose suavemente... ... Lleva tu conciencia a tus hombros... Deja que caigan lejos de tus oídos... Siente el peso de tus brazos... pesados y relajados... Tus manos descansando pacíficamente... ... Nota tu cuello... Deja que se alargue y se ablande... Tu mandíbula se relaja... Tu rostro se tranquiliza... Incluso los pequeños músculos alrededor de tus ojos se liberan......",
        
        visualization: "Imagínate en un lugar pacífico... Quizás estés acostado en una suave nube... flotando suavemente a través de un cielo estrellado... O tal vez estés descansando en un hermoso jardín... rodeado por el suave aroma de lavanda... El aire tiene la temperatura perfecta... Te sientes completamente seguro y protegido... ... Con cada respiración, te adentras más profundamente en la relajación... Tu mente se vuelve silenciosa y tranquila... como un lago en calma que refleja la luna... Cualquier pensamiento que surja simplemente flota como nubes... No necesitas aferrarte a nada......",
        
        affirmations: "Mientras descansas aquí en perfecta paz... sabe que... Estás seguro... Estás cálido... Estás protegido... Eres amado... ... Tu cuerpo sabe cómo dormir... Es seguro dejarse llevar ahora... Mereces este descanso... Mañana se cuidará de sí mismo... ... En este momento... en este ahora... todo está exactamente como debe estar......",
        
        closing: "Continúa descansando en este estado pacífico... Tu cuerpo está pesado y relajado... Tu mente está calmada y silenciosa... Con cada respiración, te hundes más profundamente en un sueño reparador... ... Te dejo ahora para que te deslices hacia sueños pacíficos... Duerme bien... Descansa profundamente... Y despierta renovado cuando sea el momento... Que tengas dulces sueños......"
      },
      
      {
        name: "Olas del Océano para Dormir",
        intro: "Bienvenido a esta meditación del océano para dormir... Acomódate cómodamente en tu cama... Cierra los ojos e imagina que estás acostado en una hermosa playa al atardecer... El sonido de las suaves olas te guiará hacia un sueño pacífico...",
        
        breathing: "Comienza respirando profundamente... Inhala el aire fresco del océano... sintiendo cómo llena completamente tus pulmones... Exhala lentamente... liberando toda la tensión del día... ... Escucha el ritmo de las olas... Dentro... y fuera... Dentro... y fuera... Deja que tu respiración siga este ritmo natural... Cada respiración te lleva más profundo hacia la relajación......",
        
        oceanVisualization: "Imagínate acostado sobre arena cálida y suave... El sol se está poniendo, pintando el cielo con hermosos colores... Puedes escuchar el sonido gentil de las olas llegando a la orilla... Cada ola se lleva tus preocupaciones y estrés... ... Siente la arena cálida que sostiene tu cuerpo... La suave brisa marina acariciando tu piel... Estás completamente seguro y en paz aquí... ... Con cada ola que llega, te sientes más somnoliento... más relajado... El océano te está cantando para dormir......",
        
        bodyRelaxation: "Ahora deja que las olas fluyan sobre tu cuerpo... Comenzando con tus pies... Siente cómo se vuelven tan pesados como arena húmeda... Las olas fluyen por tus piernas... haciéndolas completamente relajadas y pesadas... ... El agua suave fluye sobre tus caderas y espalda baja... Toda tensión se derrite como arena siendo alisada por la marea... Tus brazos flotan pacíficamente... pesados y relajados... ... Siente las olas lavando sobre tu pecho... tus hombros... tu cuello... Tu rostro se vuelve suave y pacífico... completamente relajado......",
        
        affirmations: "Con cada ola, sabes... Estás seguro y protegido... El océano te sostiene suavemente... Estás en perfecta paz... ... Tu cuerpo está listo para un sueño profundo y reparador... Las olas se llevan todas tus preocupaciones... Mañana traerá nuevas posibilidades... ... Ahora mismo, solo hay paz... solo descanso... solo el sonido suave de las olas......",
        
        closing: "Continúa descansando aquí en esta playa pacífica... Las olas continúan su ritmo suave... meciéndote hacia el sueño... ... Deja que el sonido del océano te lleve hacia hermosos sueños... Duerme profundamente... Descansa completamente... Y despierta renovado como el amanecer sobre el océano... Que tengas dulces sueños......"
      },
      
      {
        name: "Relajación Muscular Progresiva",
        intro: "Bienvenido a esta relajación muscular progresiva para dormir... Esta práctica te ayudará a liberar la tensión física y preparar tu cuerpo para un descanso profundo... Encuentra una posición cómoda y cierra los ojos... Vamos a relajar sistemáticamente cada músculo de tu cuerpo...",
        
        breathing: "Comienza con tres respiraciones profundas y liberadoras... Inhala lentamente por la nariz... Mantén por un momento... Luego exhala completamente por la boca... liberando el día... ... Otra vez, respira profundamente... siente tu cuerpo expandirse... Mantén... y libera con una exhalación larga y lenta... ... Una vez más... inhala paz... mantén... exhala toda tensión... Ahora deja que tu respiración se vuelva natural y fácil......",
        
        tensionRelease: "Ahora vamos a tensar y relajar cada grupo muscular... Esto ayuda a tu cuerpo a aprender la diferencia entre tensión y relajación... Primero, enfócate en tus pies... Curva fuertemente los dedos de los pies... Mantén por cinco segundos... uno... dos... tres... cuatro... cinco... Ahora libera... Siente la relajación inundar tus pies... ... Siguiente, tensa los músculos de tus pantorrillas... Apriétalos fuerte... Mantén... uno... dos... tres... cuatro... cinco... Y libera... Siente la tensión derritiéndose......",
        
        fullBodyProgression: "Ahora tensa los músculos de tus muslos... Apriétalos tan fuerte como puedas... Mantén por cinco... cuatro... tres... dos... uno... Y déjalos ir completamente... Siente el alivio... ... Cierra tus puños... Mantenlos apretados... cinco... cuatro... tres... dos... uno... Libera y siente tus brazos volverse pesados y relajados... ... Tensa los músculos de tus hombros... Levántalos hacia tus oídos... Mantén... Y déjalos caer... Siente la liberación... ... Aprieta los músculos de tu rostro... Cierra fuerte los ojos... Mantén... Y relaja completamente... Deja que tu rostro se vuelva suave y pacífico......",
        
        integration: "Ahora que cada músculo de tu cuerpo ha sido tensado y liberado... Siente la relajación profunda en todo tu cuerpo... Tus pies están completamente relajados... Tus piernas están pesadas y en paz... Tus brazos están sueltos y cómodos... Tu rostro está suave y pacífico... ... Nota qué diferente se siente la relajación de la tensión... Este es el estado natural de descanso de tu cuerpo... Deja que te hundas más profundo en esta sensación pacífica......",
        
        closing: "Tu cuerpo ahora está completamente preparado para dormir... Cada músculo está relajado y en paz... Has liberado toda la tensión del día... ... Es seguro dejarse llevar completamente ahora... Tu cuerpo sabe cómo descansar y repararse... Mereces este sueño pacífico... ... Confía en la sabiduría natural de tu cuerpo... Permítete deslizarte hacia un sueño profundo y reparador... Que tengas dulces sueños..."
      }
    ],

    stress: [
      {
        name: "Alivio del Estrés Mindfulness",
        intro: "Bienvenido a esta meditación para aliviar el estrés... Encuentra una posición cómoda sentado... tu espalda recta pero no rígida... Coloca tus pies planos en el suelo... siente el suelo debajo de ti... Descansa tus manos suavemente en tu regazo... Y cuando estés listo... cierra los ojos o dirige tu mirada suavemente hacia abajo...",
        
        breathing: "Comencemos tomando algunas respiraciones profundas y purificadoras... Respira por la nariz... llenando completamente tus pulmones... Y exhala por la boca... liberando cualquier tensión... ... Otra vez... respira profundamente... sintiendo tu pecho y vientre expandirse... Y exhala... dejando ir el estrés y las preocupaciones... Una vez más... respira energía fresca y calmante... Y exhala todo lo que ya no te sirve......",
        
        bodyAwareness: "Ahora lleva tu atención a tu cuerpo... Nota cualquier área donde estés manteniendo tensión... Tal vez en tus hombros... tu mandíbula... tu vientre... ... Sin tratar de cambiar nada... simplemente nota estas sensaciones... Reconócelas con amabilidad... ... Ahora imagina respirar en estas áreas tensas... Con cada inhalación... envía respiración y espacio a la tensión... Con cada exhalación... siente que la rigidez comienza a ablandarse... ... Continúa con esta respiración suave... adentro... creando espacio... afuera... liberando tensión......",
        
        mindfulness: "Deja que tu atención descanse en el momento presente... Nota la sensación de tu respiración moviéndose dentro y fuera... El suave subir y bajar de tu pecho... ... Cuando surjan pensamientos sobre tu día... y lo harán... simplemente nótalos sin juicio... Como nubes pasando por el cielo... Déjalos pasar... ... Regresa tu atención a tu respiración... Este es tu ancla... Siempre disponible... Siempre presente... ... No hay nada que necesites resolver ahora... Ningún problema que solucionar... Solo esta respiración... luego la siguiente......",
        
        visualization: "Imagina una luz dorada y cálida sobre tu cabeza... Esta es la luz de la paz y la calma... Con cada respiración... esta luz fluye hacia abajo a través de tu cuerpo... ... Fluye a través de tu cabeza... liberando tensión mental... Hacia abajo por tu cuello y hombros... derritiendo el estrés... A través de tu pecho... calmando tu corazón... Hacia abajo por tus brazos hasta las puntas de tus dedos... ... La luz dorada continúa a través de tu vientre... calmando cualquier ansiedad... Hacia abajo por tus caderas y piernas... conectándote a tierra... Hasta tus dedos de los pies... ... Ahora estás lleno de esta luz dorada y pacífica......",
        
        closing: "Mientras preparamos para terminar esta meditación... Sabe que esta sensación de calma siempre está disponible para ti... Solo a unas respiraciones de distancia... ... Comienza a mover tus dedos de manos y pies... Rueda tus hombros suavemente... Y cuando estés listo... abre lentamente los ojos... ... Toma un momento para notar cómo te sientes... Lleva esta paz contigo mientras continúas tu día... Recuerda... puedes regresar a este centro calmado cuando lo necesites... Gracias por tomar este tiempo para ti......"
      },
      
      {
        name: "Escaneo Corporal para Alivio del Estrés",
        intro: "Bienvenido a esta meditación de escaneo corporal para el alivio del estrés... Esta práctica te ayuda a liberar sistemáticamente la tensión acumulada en todo tu cuerpo... Encuentra una posición cómoda... Cierra los ojos y prepárate para viajar a través de tu cuerpo con conciencia y compasión...",
        
        breathing: "Comienza con tres respiraciones profundas y liberadoras... Inhala por la nariz... llenando tu cuerpo con energía calmante... Exhala por la boca... liberando el estrés del día... ... Siente tu cuerpo comenzando a relajarse... Tu respiración volviéndose más profunda y natural... Cada exhalación lleva tensión... Cada inhalación trae paz......",
        
        headAndNeck: "Comienza llevando tu atención a la parte superior de tu cabeza... Nota cualquier tensión o rigidez... Respira en esta área... Envía relajación a tu cuero cabelludo... ... Mueve tu atención a tu frente... A menudo mantenemos estrés aquí... Deja que tu frente se vuelva lisa y relajada... ... Nota tus ojos... Deja que se ablanden... Tu mandíbula... Deja que se desbloquee y relaje... Siente todo tu rostro volviéndose pacífico......",
        
        shouldersAndArms: "Ahora enfócate en tu cuello... Esta área a menudo carga el peso de nuestro estrés... Respira en tu cuello... Deja que se alargue y ablande... ... Lleva tu atención a tus hombros... Nota si están levantados hacia tus oídos... Déjalos caer... Siente el alivio mientras se liberan... ... Tus brazos... Deja que se vuelvan pesados y relajados... Tus manos... Deja que descansen pacíficamente... Toda tensión fluyendo hacia fuera por las puntas de tus dedos......",
        
        torsoAndCore: "Enfócate en tu pecho... A veces el estrés hace que nuestro pecho se sienta apretado... Respira en tu pecho... Deja que se expanda y relaje... ... Tu corazón... Envíale amor y aprecio... Ha estado trabajando duro... Deja que descanse en paz... ... Tu vientre... Aquí a menudo mantenemos tensión emocional... Respira en tu vientre... Deja que se ablande y libere... ... Tu espalda... Deja que esté apoyada... Todas las cargas que llevas... déjalas ir......",
        
        lowerBodyRelease: "Lleva tu atención a tus caderas... Deja que se asienten y relajen... ... Tus piernas... Deja que se vuelvan pesadas y sueltas... Siente el estrés drenando hacia abajo por tus piernas... ... Tus pies... Deja que se relajen completamente... Siente toda tensión saliendo de tu cuerpo por tus pies... fluyendo hacia la tierra... ... Todo tu cuerpo ahora está relajado y en paz......",
        
        integration: "Toma un momento para sentir todo tu cuerpo... Relajado... pacífico... libre de tensión... ... Nota qué diferente te sientes cuando el estrés es liberado... Este es el estado natural de tu cuerpo... Recuerda esta sensación... Puedes regresar a ella cuando lo necesites... ... Respira esta paz... Exhala cualquier tensión restante......",
        
        closing: "Mientras completamos este escaneo corporal... Sabe que tienes el poder de liberar estrés en cualquier momento... Simplemente respira en la tensión y déjala ir... ... Lentamente comienza a mover tus dedos de manos y pies... Cuando estés listo... abre los ojos... Lleva esta relajación contigo a tu día... Estás calmado... Estás en paz... Tienes control sobre tu respuesta al estrés..."
      },
      
      {
        name: "Respiración para Alivio del Estrés",
        intro: "Bienvenido a esta meditación de respiración para el alivio del estrés... Cuando estamos estresados... nuestra respiración se vuelve superficial y rápida... Esta práctica te ayudará a usar tu respiración para activar la respuesta natural de relajación de tu cuerpo... Encuentra una posición cómoda y cierra los ojos...",
        
        breathAwareness: "Comienza simplemente notando tu respiración... No trates de cambiarla... Solo observa... Nota dónde sientes tu respiración más claramente... Tal vez en tus fosas nasales... o en tu pecho... o tu vientre... ... Simplemente observa tu respiración por unos momentos... Esta es tu fuerza vital... Siempre disponible... Siempre apoyándote......",
        
        deepBreathing: "Ahora vamos a profundizar tu respiración... Coloca una mano en tu pecho y una en tu vientre... Mientras inhalas... siente tu vientre expandirse... Esta es respiración profunda y diafragmática... ... Respira lentamente por la nariz... sintiendo tu vientre subir... Exhala por la boca... sintiendo tu vientre bajar... ... Continúa con esta respiración profunda... Dentro por la nariz... Fuera por la boca... Cada respiración libera estrés......",
        
        countedBreathing: "Ahora agreguemos conteo para regular tu respiración... Respira por cuatro cuentas... uno... dos... tres... cuatro... Mantén por cuatro... uno... dos... tres... cuatro... Respira hacia fuera por seis... uno... dos... tres... cuatro... cinco... seis... ... La exhalación más larga ayuda a activar tu respuesta de relajación... Continúa este patrón... Dentro por cuatro... Mantén por cuatro... Fuera por seis... Siente tu sistema nervioso calmándose con cada respiración......",
        
        breathVisualization: "Mientras continúas con este patrón de respiración... Imagina respirar aire calmante y fresco... Este aire lleva paz y tranquilidad... ... Mientras exhalas... imagina liberar aire caliente y tenso... Este aire lleva tu estrés y preocupación... ... Dentro... aire fresco y calmante... Fuera... aire caliente y estresante... ... Con cada ciclo... te vuelves más relajado... más en paz......",
        
        affirmations: "Mientras respiras... repite estas afirmaciones silenciosamente... 'Estoy calmado'... Respira hacia dentro... 'Estoy en paz'... Respira hacia fuera... ... 'Libero todo estrés'... Respira hacia dentro... 'Tengo control'... Respira hacia fuera... ... 'Estoy seguro'... Respira hacia dentro... 'Estoy relajado'... Respira hacia fuera... ... Continúa con cualquier afirmación que se sienta correcta para ti......",
        
        integration: "Ahora deja que tu respiración regrese a lo normal... Pero nota qué diferente se siente... Más profunda... más relajada... más natural... ... Recuerda... tu respiración siempre está contigo... Cuando te sientes estresado... puedes regresar a esta respiración calmada... ... Toma un momento para apreciar esta herramienta que siempre llevas contigo......",
        
        closing: "Mientras terminamos esta meditación de respiración... Sabe que has accedido al sistema natural de alivio del estrés de tu cuerpo... Tu respiración es tu compañera constante... siempre lista para ayudarte a encontrar calma... ... Toma tres respiraciones más profundas... Mueve tus dedos de manos y pies... Cuando estés listo... abre los ojos... Estás calmado... Estás centrado... Estás en paz..."
      },
      
      {
        name: "Conexión a Tierra para Alivio del Estrés",
        intro: "Bienvenido a esta meditación de conexión a tierra para el alivio del estrés... Cuando estamos estresados... a menudo nos sentimos dispersos y abrumados... Esta práctica te ayudará a sentirte centrado... estable... y conectado al momento presente... Encuentra una posición cómoda sentado con tus pies en el suelo...",
        
        physicalGrounding: "Comienza sintiendo tu conexión con la tierra... Siente tus pies planos en el suelo... Presiόnalos suavemente contra el suelo... ... Siente tus huesos de sentado en contacto con tu silla... Tu espalda contra la silla... ... Nota la temperatura del aire en tu piel... La textura de tu ropa... ... Estas sensaciones físicas te anclan en el momento presente... Estás aquí... Estás seguro... Estás conectado a tierra......",
        
        breathingAndEarth: "Ahora imagina raíces creciendo desde tus pies... Profundo en la tierra... Estas raíces te conectan con la energía estable y de apoyo de la tierra... ... Con cada respiración... siente estas raíces creciendo más profundo... anclándote... apoyándote... ... La tierra siempre está aquí para ti... Sólida... confiable... sin cambios... ... Siente esta estabilidad subiendo a través de tus raíces... hacia tu cuerpo... conectándote a tierra......",
        
        fiveToGrounding: "Usemos la técnica 5-4-3-2-1 para conectarte a tierra... Nota cinco cosas que puedes escuchar... Tal vez el sonido de tu respiración... sonidos afuera... el zumbido de la electricidad... ... Nota cuatro cosas que puedes tocar... Tus pies en el suelo... tus manos en tu regazo... la silla apoyándote... tu ropa... ... Nota tres cosas que puedes oler... El aire en la habitación... tal vez un toque de productos de limpieza... o aire exterior... ... Nota dos cosas que puedes saborear... Tal vez el sabor persistente de algo que bebiste... o solo el sabor de tu boca... ... Nota una cosa que puedes ver con los ojos cerrados... Tal vez patrones de luz... o solo oscuridad... ... Estás completamente presente... completamente conectado a tierra......",
        
        mountainVisualization: "Imagínate como una montaña... Fuerte... sólida... inmovible... ... Tu base es profunda y amplia... enraizada firmemente en la tierra... Nada puede sacudirte... ... Las tormentas pueden venir e irse a tu alrededor... Pero permaneces estable... estable... conectado a tierra... ... Siente esta fuerza de montaña en tu propio cuerpo... Eres sólido... Eres estable... Estás conectado a tierra......",
        
        stressRelease: "Ahora imagina todo tu estrés... todas tus preocupaciones... todas tus tensiones... fluyendo hacia abajo a través de tu cuerpo... Hacia abajo a través de tus raíces... hacia la tierra... ... La tierra es infinitamente capaz de absorber y transformar este estrés... ... Con cada respiración... envía más estrés hacia abajo a través de tus raíces... Deja que la tierra lo tome... lo transforme... ... Te estás volviendo más ligero... más claro... más en paz......",
        
        affirmations: "Repite estas afirmaciones de conexión a tierra... 'Estoy conectado a la tierra'... 'Soy estable y fuerte'... 'Estoy presente en este momento'... ... 'Estoy seguro y protegido'... 'Estoy conectado a tierra y centrado'... 'Estoy en paz'... ... Siente estas verdades en tu cuerpo... en tus huesos... en tu conexión con la tierra......",
        
        closing: "Mientras terminamos esta meditación de conexión a tierra... Siente qué diferente eres ahora... Más estable... más centrado... más en paz... ... Recuerda... puedes conectarte con esta energía de conexión a tierra en cualquier momento... Simplemente siente tus pies en el suelo... tu conexión con la tierra... ... Toma tres respiraciones profundas... Mueve tus dedos de manos y pies... Cuando estés listo... abre los ojos... Estás conectado a tierra... Estás centrado... Estás en paz..."
      }
    ],

    focus: [
      {
        name: "Concentración con Ancla Respiratoria",
        intro: "Bienvenido a esta meditación de concentración y enfoque... Siéntate cómodamente con tu columna erguida y alerta... Descansa tus manos en tus rodillas o en tu regazo... Toma un momento para establecer una intención de claridad y enfoque... Cuando estés listo... cierra suavemente los ojos...",
        
        breathing: "Comienza tomando tres respiraciones profundas y energizantes... Respira por la nariz... llenando tus pulmones con aire fresco... Y exhala completamente por la boca... ... Otra vez... inhala profundamente... sintiéndote alerta y despierto... Exhala completamente... liberando cualquier niebla mental... Una vez más... respira claridad... exhala distracción... ... Ahora deja que tu respiración regrese a lo normal... pero mantén tu atención en cada respiración......",
        
        anchorPractice: "Usaremos tu respiración como ancla para tu atención... Enfócate en la sensación del aire entrando en tus fosas nasales... Fresco al inhalar... Tibio al exhalar... ... Mantén tu atención justo en la punta de tu nariz... Donde primero sientes la respiración... ... Cuando tu mente divague... y lo hará... simplemente nota hacia dónde fue... Luego suavemente... sin juicio... regresa tu atención a la respiración... Esta es la práctica... Notar... Regresar... Una y otra vez......",
        
        affirmations: "Repite mentalmente estas afirmaciones para el enfoque... 'Mi mente está clara y aguda'... ... 'Estoy completamente presente y consciente'... ... 'Mi concentración es fuerte y estable'... ... 'Me enfoco con facilidad y claridad'... ... Deja que estas palabras se hundan profundamente en tu conciencia......",
        
        closing: "Mientras completamos esta meditación... Siente la claridad mejorada en tu mente... Tu capacidad mejorada para enfocarte... ... Comienza a profundizar tu respiración... Mueve tus dedos de manos y pies... Y cuando estés listo... abre los ojos... ... Nota qué tan alerta y enfocado te sientes... Tu mente está clara... aguda y lista... Lleva esta atención enfocada a tu próxima actividad... Estás preparado para trabajar con precisión y claridad......"
      },
      
      {
        name: "Concentración Láser",
        intro: "Bienvenido a esta meditación de concentración intensa... Vamos a entrenar tu concentración como un rayo láser... enfocado... claro... y poderoso... Siéntate con tu columna recta... pies firmemente en el suelo... ojos cerrados pero alerta...",
        
        preparation: "Imagina que tu mente es una lupa... que puede concentrar la luz solar en un rayo poderoso y enfocado... Hoy entrenarás esa habilidad... ... Toma tres respiraciones agudas y energizantes... Con cada respiración te vuelves más alerta... más agudo... más enfocado... ... Siente energía reuniéndose en el centro de tu frente... Este se convierte en tu punto focal......",
        
        singlePointed: "Elige un solo punto en el cual enfocarte... Puede ser la sensación de tu respiración... el sonido de tu corazón... o una visualización de una llama brillante... ... Lo que elijas... mantén toda tu atención dirigida hacia él... Como un rayo láser... estrecho... intenso... inquebrantable... ... Cuando tu mente trate de divagar... y lo hará... tráela de vuelta inmediatamente... No un regreso suave... sino una redirección fuerte y decidida......",
        
        intensification: "Ahora haz tu enfoque aún más agudo... Imagina que puedes hacer zoom en tu punto elegido... Si te enfocas en la respiración... haz zoom en una fosa nasal... Si te enfocas en sonido... haz zoom en un tono específico... ... Siente la intensidad de tu concentración aumentar... Tu mente se convierte en un instrumento de precisión finamente ajustado... Cada segundo de atención enfocada te hace más fuerte......",
        
        distractionTraining: "Ahora vamos a entrenar tu resistencia a la distracción... Permite que pensamientos... sonidos... sensaciones surjan... Pero no dejes que disturben tu enfoque... ... Eres como una roca en las olas... Las ondas de distracción pueden golpearte... pero permaneces estable... inmóvil... enfocado... ... Cada vez que resistes la distracción... tu músculo mental se vuelve más fuerte......",
        
        laserVisualization: "Ahora visualiza un rayo láser azul brillante... irradiando desde tu frente... Este rayo representa tu atención concentrada... ... Mira qué estable y poderoso es este rayo... Corta a través de toda distracción... directo a tu objetivo... ... Siente cómo este rayo láser representa tu poder mental... Tu capacidad de enfocarte en lo que realmente importa......",
        
        affirmations: "Fortalece tu enfoque con estas afirmaciones poderosas... 'Mi mente es un rayo láser de concentración'... 'Soy el maestro de mi atención'... 'Nada puede disturbar mi enfoque'... 'Soy mentalmente invencible'... ... Siente estas palabras dando agudeza a tu mente... como afilar hace agudo un cuchillo......",
        
        closing: "Acabas de entrenar tu enfoque mental como un atleta... Tu mente ahora está más aguda... más fuerte... más dirigida... ... Recuerda esta sensación de concentración intensa... Esta es tu capacidad natural... siempre disponible cuando la necesites... ... Abre los ojos con enfoque de rayo láser... Listo para abordar cualquier tarea con absoluta precisión y control..."
      },
      
      {
        name: "Concentración Estable como Montaña",
        intro: "Bienvenido a esta meditación de enfoque inspirada en montañas... Vamos a construir tu concentración con la estabilidad de una montaña ancestral... inmovible... calmada... y confiable... Siéntate cómodamente y siente tu conexión con la tierra...",
        
        mountainConnection: "Imagina que te sientas como una montaña... Tu base es amplia y profundamente enraizada en la tierra... Tu columna se alza como un pico montañoso... estable y majestuoso... ... Siente esta energía de montaña en tu cuerpo... Pesada... estable... inmóvil... Las tormentas pueden venir e irse... pero tú permaneces sin cambios......",
        
        breathMountain: "Tu respiración ahora se convierte en el viento que sopla alrededor de la montaña... A veces suave y calmado... a veces más fuerte... pero la montaña siempre permanece estable... ... Enfócate en el ritmo natural de tu respiración... sin cambiarlo... Solo observando... como una montaña observa sin juicio... ... Eres tanto la montaña como el observador... estable y consciente......",
        
        weatherPatterns: "Los pensamientos y emociones son como patrones climáticos alrededor de la montaña... A veces hay momentos claros y soleados... A veces nubes de confusión... A veces tormentas de emociones fuertes... ... Pero la montaña siempre permanece igual... Sin ser afectada por el clima... Tú eres esa montaña... Estable... calmado... enfocado a pesar de todo el 'clima' mental......",
        
        rootedFocus: "Siente tu enfoque enraizado en la tierra... como raíces de árboles que crecen profundo... Mientras más profundas tus raíces... más estable tu concentración... ... Cada vez que notes que divaga... imagina que permites que tus raíces crezcan más profundo... Conectando tu atención cada vez más firmemente... ... Esto es estar enfocado sin tensión... Estable sin estar rígido......",
        
        peakClarity: "Desde la cima de tu conciencia-montaña... tienes una vista clara... Puedes ver todo... pero nada disturba tu paz... ... Tu enfoque ahora es panorámico... lo suficientemente amplio para percibir todo... pero lo suficientemente estable para no ser distraído... ... Esta es verdadera concentración... espaciosa y estable al mismo tiempo......",
        
        closing: "Lleva esta estabilidad de montaña a tu día... Sabe que siempre puedes regresar a esta montaña interior... ... Cuando te sientes abrumado... recuerda esta estabilidad... Eres la montaña... inmutable... pacífica... enfocada... ... Abre los ojos y siéntete enraizado... estable... y claramente listo para lo que venga..."
      }
    ],

    anxiety: [
      {
        name: "Alivio de Ansiedad con Conexión a Tierra",
        intro: "Bienvenido a esta meditación para aliviar la ansiedad... Encuentra una posición cómoda donde te sientas apoyado y seguro... Puedes poner una mano en tu corazón y otra en tu vientre... Esto te ayuda a sentirte conectado a tierra y conectado contigo mismo... Toma un momento para llegar completamente aquí...",
        
        grounding: "Comencemos conectándonos a tierra en el momento presente... Siente tus pies en el suelo... o tu cuerpo en la silla... Nota cinco cosas que puedes sentir ahora... La temperatura del aire... La textura de tu ropa... El peso de tu cuerpo... ... Esto es real... Esto es ahora... Estás seguro en este momento......",
        
        breathing: "Ahora usemos un patrón de respiración calmante... Respira lentamente durante cuatro cuentas... uno... dos... tres... cuatro... Mantén suavemente durante cuatro... uno... dos... tres... cuatro... Y exhala lentamente durante seis... uno... dos... tres... cuatro... cinco... seis... ... Esta exhalación más larga activa la respuesta de relajación de tu cuerpo... Otra vez... adentro durante cuatro... mantén durante cuatro... afuera durante seis... ... Continúa con este ritmo calmante... sintiéndote más tranquilo con cada ciclo......",
        
        affirmations: "Ofrezcámonos algunas afirmaciones calmantes... 'Estoy seguro en este momento'... ... 'Este sentimiento pasará'... ... 'He sobrevivido a la ansiedad antes y la sobreviviré de nuevo'... ... 'Soy más fuerte que mi ansiedad'... ... 'La paz es mi estado natural'... ... 'Elijo la calma'......",
        
        closing: "Mientras terminamos esta meditación... Recuerda que siempre tienes estas herramientas disponibles... Tu respiración... Tu lugar seguro... Tu fuerza interior... ... Comienza a mover suavemente tu cuerpo... Tal vez estírate un poco... Toma una respiración profunda y abre lentamente los ojos... ... Nota cualquier cambio en cómo te sientes... Incluso un pequeño cambio es significativo... Sé gentil contigo mismo mientras regresas a tu día... Eres valiente... Eres capaz... Y no estás solo......"
      },
      
      {
        name: "Calma Centrada en el Corazón",
        intro: "Bienvenido a esta meditación centrada en el corazón para la ansiedad... Coloca una mano en tu corazón y siente la calidez... Este es tu centro de calma y sabiduría... Vamos a aprender a conectar con la paz natural de tu corazón...",
        
        heartConnection: "Siente la calidez de tu mano en tu corazón... Nota el latido suave y regular de tu corazón... Este corazón te ha llevado a través de todo... es tu compañero fiel... ... Respira lenta y profundamente... imagina que respiras directamente hacia tu corazón... Con cada respiración... tu corazón se vuelve más suave... más abierto... más amable contigo mismo......",
        
        heartBreathing: "Ahora vamos a hacer respiración centrada en el corazón... Respira hacia tu corazón durante cuatro cuentas... Siente tu corazón expandirse con amor... Mantén por un momento... Exhala desde tu corazón durante seis cuentas... Enviando calma a cada célula... ... Con cada latido... con cada respiración... te sientes más seguro... más amado... más en paz contigo mismo......",
        
        selfCompassion: "Desde tu corazón... envíate compasión... Como lo harías para un querido amigo que está ansioso... Dite a ti mismo... 'Está bien sentir ansiedad'... 'Soy humano y a veces las personas se sienten ansiosas'... 'Soy digno de amor y comprensión'... ... Siente cómo tu corazón se abre hacia ti mismo... Eres tu mejor amigo......",
        
        heartShield: "Imagina que tu corazón irradia un escudo protector de luz... Esta luz envuelve todo tu cuerpo... Nada dañino puede penetrar esta luz... ... Estás seguro dentro de esta energía del corazón... Incluso si la ansiedad trata de entrar... es transformada por el amor... Tu corazón es más poderoso que la ansiedad......",
        
        lovingPresence: "Siente la presencia de todas las personas que alguna vez te han amado... Padres... amigos... familia... maestros... Incluso si no están físicamente presentes... su amor vive en tu corazón... ... Nunca estás solo... Estás rodeado por un círculo invisible de amor... Este amor te protege... te consuela... te da valor......",
        
        heartWisdom: "Tu corazón contiene sabiduría profunda... Hazle una pregunta sobre tu ansiedad... No escuches con tu cabeza... sino con tu corazón... ¿Qué quiere tu corazón que sepas?... ... Tal vez sea... 'Estás más seguro de lo que piensas'... O... 'Este sentimiento pasará'... Confía en la voz suave de tu corazón......",
        
        closing: "Mientras concluimos esta meditación del corazón... Sabe que tu corazón siempre está disponible como refugio... Simplemente pon tu mano en él y siente el amor... ... Tu corazón es tu hogar... tu centro de calma... Siempre puedes regresar a él... Ahora y siempre... Eres amado... Estás seguro... Estás completo..."
      },
      
      {
        name: "Técnica 5-4-3-2-1 de Conexión a Tierra",
        intro: "Bienvenido a esta meditación de conexión a tierra para la ansiedad... Cuando la ansiedad nos abruma... puede ayudar regresar a nuestros sentidos... al aquí y ahora... Esta técnica te trae directamente de vuelta al momento presente...",
        
        preparation: "Siéntate cómodamente... pies planos en el suelo... Toma tres respiraciones profundas... Con cada exhalación... deja que tu cuerpo se relaje un poco más... Ahora vamos a usar tus sentidos para conectarte a tierra en este momento......",
        
        fiveThings: "Mira a tu alrededor e identifica CINCO cosas que puedes ver... Dílas en voz alta o mentalmente... 'Veo una puerta... Veo mis manos... Veo luz... Veo una pared... Veo sombras...' ... Tómate tiempo para realmente mirar cada objeto... Nota detalles... colores... formas... texturas......",
        
        fourThings: "Ahora identifica CUATRO cosas que puedes sentir... 'Siento mis pies en el suelo... Siento la silla contra mi espalda... Siento el aire en mi piel... Siento mi ropa...' ... Concéntrate completamente en estas sensaciones físicas... Este es tu cuerpo en este momento... real y estable......",
        
        threeThings: "Escucha e identifica TRES cosas que puedes oír... 'Escucho mi respiración... Escucho tráfico afuera... Escucho el zumbido de un aparato...' ... Escucha realmente... incluso el silencio entre sonidos... Estos sonidos te anclan en el ahora......",
        
        twoThings: "Nota DOS cosas que puedes oler... 'Huelo el aire en esta habitación... Huelo un toque de perfume...' ... Si no hueles nada específico... simplemente nota la calidad del aire... Aire fresco... aire cálido... aire neutral......",
        
        oneThing: "Finalmente... una cosa que puedes saborear... Tal vez el sabor persistente de algo que bebiste recientemente... o solo el sabor neutral de tu boca... ... Este es tu sentido del gusto... presente en este momento......",
        
        integration: "Nota cómo te sientes ahora... Más conectado a tierra... más conectado con este momento... Menos en tu cabeza... más en tu cuerpo... ... Esta es la diferencia entre ansiedad (a menudo sobre el futuro) y el momento presente (donde estás seguro)......",
        
        closing: "Acabas de aprender una técnica poderosa... 5-4-3-2-1... Úsala cuando la ansiedad trate de llevarte a preocupaciones sobre el futuro... Regresa a tus sentidos... a este momento... a la seguridad del ahora... Esta técnica siempre va contigo..."
      }
    ],

    energy: [
      {
        name: "Energía del Sol Dorado",
        intro: "Bienvenido a esta meditación energizante... Siéntate o párate en una posición que se sienta fuerte y alerta... Imagina una cuerda tirándote hacia arriba desde la corona de tu cabeza... Siente tu columna alargarse... tu pecho abrirse... Estás a punto de despertar tu vitalidad natural...",
        
        breathing: "Comencemos con algunas respiraciones energizantes... Toma una respiración profunda por la nariz... llenando todo tu cuerpo con energía fresca... Y exhala vigorosamente por la boca con un sonido 'HA'... liberando cualquier fatiga... ... Otra vez... respira vitalidad y fuerza vital... Y exhala 'HA'... dejando ir la pereza... Una vez más... inhala poder y energía... Exhala 'HA'... sintiéndote más despierto......",
        
        energyVisualization: "Imagina un sol dorado brillante en el centro de tu pecho... Esta es tu fuente interior de energía... Con cada respiración... este sol se vuelve más brillante y más grande... ... Siente sus rayos cálidos extendiéndose por todo tu cuerpo... Hacia arriba por tu pecho y hombros... Hacia abajo por tus brazos hasta las puntas de tus dedos... que hormiguean con energía... ... La luz dorada fluye hacia arriba por tu garganta y cabeza... Tu mente se vuelve clara y alerta... Hacia abajo por tu vientre y caderas... A través de tus piernas... conectándote a tierra mientras te energiza... ... Todo tu cuerpo brilla con fuerza vital vibrante......",
        
        affirmations: "Activemos tu energía con afirmaciones poderosas... 'Estoy lleno de energía vibrante'... ... 'Mi cuerpo está fuerte y vivo'... ... 'Tengo toda la energía que necesito para mi día'... ... 'Estoy motivado y listo para la acción'... ... 'La energía fluye libremente a través de mí'... ... Siente estas palabras cargando cada célula de tu cuerpo......",
        
        closing: "Mientras completamos esta meditación energizante... Siente la vitalidad corriendo por tus venas... Estás despierto... alerta y completamente cargado... ... Comienza a mover tu cuerpo como se sienta bien... Tal vez estira tus brazos sobre tu cabeza... Rueda tu cuello... Rebota suavemente en tus dedos de los pies... ... Cuando estés listo... abre los ojos ampliamente... Absorbe el mundo con energía fresca... Estás listo para abrazar tu día con entusiasmo y poder... Ve adelante y deja brillar tu luz......"
      },
      
      {
        name: "Despertar Corporal Energético",
        intro: "Bienvenido a esta meditación de despertar corporal... Vamos a activar tu energía desde dentro hacia fuera... usando movimiento consciente y respiración poderosa... Siéntate o párate en una posición que se sienta vibrante y viva...",
        
        bodyAwakening: "Comencemos despertando tu cuerpo... Frota vigorosamente tus palmas... Siente el calor y la energía acumulándose... Coloca tus palmas cálidas sobre tus ojos por un momento... ... Ahora toca suavemente por toda tu cabeza con las puntas de tus dedos... Despertando tu mente... Masajea tus sienes en pequeños círculos... ... Rueda tus hombros hacia atrás... sintiendo tu pecho abrirse y expandirse... Gira suavemente tu columna hacia la izquierda y derecha... Sintiendo energía fluir a través de tu núcleo......",
        
        energeticBreathing: "Ahora vamos a cargar tu sistema con respiración energética... Toma una respiración profunda y retén... Luego exhala rápidamente con tres pequeñas exhalaciones... 'ha-ha-ha'... ... Siente esta respiración vibrando a través de tu cuerpo... despertando cada célula... ... Repite... Inhalación profunda... retén... 'ha-ha-ha'... Cada ciclo te energiza más... Sientes tu sistema nervioso activándose de manera positiva......",
        
        powerVisualization: "Imagina un poderoso río de energía dorada fluyendo a través de tu columna... Desde la base de tu columna hasta la corona de tu cabeza... ... Esta energía es tu fuerza vital... tu poder personal... tu vitalidad innata... Siente cómo se intensifica con cada respiración... ... Ahora imagina esta energía irradiando hacia afuera... llenando todo tu campo energético... Eres como un sol brillante... irradiando vitalidad......",
        
        movementActivation: "Si te sientes cómodo... permite que tu cuerpo se mueva... Rueda tus hombros... Mueve tu cabeza suavemente... Deja que tus brazos se balanceen... ... No hay manera correcta o incorrecta... solo deja que tu cuerpo exprese esta energía que estás sintiendo... Movimiento consciente despierta energía dormida......",
        
        affirmations: "Siente esta energía mientras afirmas... 'Soy vibrante y vivo'... 'Mi energía es ilimitada'... 'Estoy completamente despierto y alerta'... 'Mi cuerpo es un templo de vitalidad'... 'Irradio energía positiva'... ... Estas palabras se convierten en realidad en tu cuerpo......",
        
        closing: "Mientras sellamos esta energía... Toma tres respiraciones poderosas... Cada una más grande que la anterior... Siente tu energía estabilizándose en un nivel alto y sostenible... ... Tu cuerpo ahora está completamente activado... Tu mente clara y enfocada... Tu espíritu elevado... Lleva esta vitalidad contigo... Eres una fuerza de la naturaleza... radiante y poderosa..."
      },
      
      {
        name: "Luz Solar Matutina",
        intro: "Bienvenido a esta meditación de luz solar matutina... Imagina que estás absorbiendo los primeros rayos del amanecer... Esta práctica te conecta con la energía renovadora del nuevo día... Siéntate mirando hacia donde imaginas que sale el sol...",
        
        sunConnection: "Visualiza el sol naciente... Sus rayos dorados tocando tu rostro... Siente la calidez suave en tu piel... Esta es energía pura... vida... vitalidad... ... Imagina que tu piel puede absorber esta luz solar... Cada poro de tu cuerpo bebiendo esta energía dorada... Sientes cómo te llena desde afuera hacia adentro......",
        
        solarBreathing: "Ahora respira esta luz solar... Con cada inhalación... imagina que estás respirando rayos dorados... Esta luz llena tus pulmones... tu sangre... cada célula de tu cuerpo... ... Con cada exhalación... irradia esta luz desde tu interior... Te conviertes en una fuente de luz solar... brillando desde adentro hacia afuera......",
        
        bodyIllumination: "Siente esta luz solar moviéndose a través de tu cuerpo... Iluminando tu cabeza... despejando cualquier niebla mental... Fluyendo por tu garganta... dándote voz clara y fuerte... ... A través de tu corazón... llenándolo de calidez y alegría... Por tus brazos... dándoles fuerza vital... A través de tu vientre... tu centro de poder personal... ... Hacia abajo por tus piernas... conectándote a tierra mientras te eleva... Hasta las plantas de tus pies... donde te conectas con la energía de la Tierra......",
        
        solarAffirmations: "Desde esta conexión con la luz solar... afirma... 'Soy uno con la energía del sol'... 'Irradio luz y vitalidad'... 'Cada día me renuevo como el amanecer'... 'Soy una fuente de energía positiva'... 'Brillo con mi luz interior'... ... Siente estas verdades resonando en cada fibra de tu ser......",
        
        radiatingEnergy: "Ahora imagina que esta energía solar no solo te llena... sino que se extiende más allá de tu cuerpo... Creando un campo de luz dorada a tu alrededor... ... Esta es tu aura energética... tu campo de vitalidad... Cualquiera que se acerque a ti puede sentir esta energía positiva... Eres un regalo de luz para el mundo......",
        
        closing: "Mientras concluimos esta meditación solar... Siente cómo llevas esta luz contigo... No dependes del sol exterior... eres tu propio sol interior... ... Lleva esta irradiación solar a tu día... Ilumina cada espacio que entres... cada persona que encuentres... Eres luz solar caminando en forma humana..."
      }
    ],

    mindfulness: [
      {
        name: "Conciencia del Momento Presente",
        intro: "Bienvenido a esta meditación de conciencia plena... Encuentra una posición cómoda sentado... tu espalda erguida pero relajada... Coloca tus manos suavemente en tu regazo... Respira naturalmente... y simplemente permite que tu cuerpo se asiente... Cuando estés listo... cierra suavemente los ojos...",
        
        breathing: "Comencemos llevando toda nuestra atención a la respiración... Sin cambiar nada... simplemente nota la respiración tal como es... Siente el aire entrando suavemente por tu nariz... llenando tu pecho... y saliendo naturalmente... ... Cada respiración es una oportunidad para estar completamente presente... Inhala conciencia... exhala distracción... ... Continúa respirando con atención plena... sintiendo cada inhalación... cada exhalación... siendo uno con el momento presente......",
        
        bodyAwareness: "Ahora expande tu conciencia para incluir todo tu cuerpo... Comienza en la coronilla de tu cabeza... Siente cualquier sensación allí... sin juicio... simplemente notando... ... Mueve tu atención hacia abajo a tu frente... tus ojos... tus mejillas... tu mandíbula... Nota cualquier tensión o relajación... ... Continúa hacia tu cuello... hombros... brazos... hasta las puntas de tus dedos... Siente tu pecho subir y bajar... tu vientre expandir y contraer... ... Lleva tu conciencia a tu espalda... caderas... piernas... hasta los dedos de los pies... Todo tu cuerpo está vivo con sensaciones en este momento......",
        
        presentMoment: "Ahora abre tu conciencia al momento presente completo... Nota los sonidos a tu alrededor... cerca y lejos... No los juzgues... simplemente déjalos ser parte de tu experiencia... ... Siente la temperatura del aire en tu piel... La textura de tu ropa... El peso de tu cuerpo... ... Cuando surjan pensamientos... y lo harán... simplemente obsérvalos como nubes en el cielo... No necesitas seguirlos... solo déjalos pasar... ... Regresa a este momento... esta respiración... esta conciencia... Aquí... ahora... completamente presente......",
        
        affirmations: "Repite silenciosamente estas afirmaciones de presencia... 'Estoy completamente presente en este momento'... ... 'Abrazo todo lo que surge con conciencia'... ... 'Mi atención está anclada en el ahora'... ... 'Soy consciente... despierto... vivo'... ... 'La vida está sucediendo ahora... y estoy aquí para experimentarla'......",
        
        closing: "Mientras terminamos esta práctica... Siente la profundidad de tu presencia... La riqueza de estar completamente aquí... ... Comienza a profundizar tu respiración... Mueve suavemente tus dedos... rueda tus hombros... ... Cuando estés listo... abre los ojos lentamente... ... Lleva esta conciencia del momento presente contigo... La vida es una serie de momentos presentes... Y ahora sabes cómo habitarlos plenamente......"
      },
      
      {
        name: "Observación de Pensamientos",
        intro: "Bienvenido a esta práctica de observación de pensamientos... En lugar de ser arrastrado por los pensamientos... vamos a aprender a observarlos desde una perspectiva más amplia... Siéntate cómodamente... tu columna erguida... y permite que tu respiración se vuelva natural...",
        
        breathing: "Comienza estableciendo una base estable en tu respiración... Nota el flujo natural de inhalar y exhalar... Sin controlar... solo observando... ... Tu respiración es tu ancla... tu punto de regreso cuando te das cuenta de que has sido arrastrado por pensamientos... ... Continúa respirando conscientemente... cada respiración te trae más plenamente al momento presente......",
        
        thoughtObservation: "Ahora permite que tu atención se expanda para incluir pensamientos... Nota que los pensamientos surgen naturalmente... como burbujas en agua... ... No trates de detener los pensamientos... Esto es imposible... En lugar de eso... obsérvalos... ¿De dónde vienen?... ¿Cómo se sienten?... ¿Hacia dónde van?... ... Imagina que eres el cielo... y los pensamientos son nubes que pasan... El cielo no es afectado por las nubes... permanece vasto y abierto......",
        
        labelingPractice: "Cuando notes un pensamiento... puedes etiquetarlo suavemente... Si es sobre el pasado... simplemente nota 'recordando'... Si es sobre el futuro... 'planificando'... Si es crítico... 'juzgando'... ... No hay pensamientos buenos o malos... todos son simplemente fenómenos mentales pasajeros... Observa sin involucrarte... como un científico curioso estudiando la mente......",
        
        spaciousAwareness: "Ahora expande tu conciencia aún más... Eres el espacio consciente en el que surgen pensamientos... sensaciones... sonidos... ... Este espacio consciente es inmutable... siempre presente... siempre en paz... Los pensamientos van y vienen... pero tú... la conciencia que los observa... permaneces... ... Descansa en esta conciencia espaciosa... Esta es tu naturaleza más profunda......",
        
        integration: "Nota la diferencia entre estar perdido en pensamientos y observar pensamientos... Cuando observas... hay espacio... libertad... elección... ... Esta capacidad de observar está siempre disponible... En cualquier momento... puedes dar un paso atrás y observar tu experiencia en lugar de ser arrastrado por ella......",
        
        closing: "Mientras terminamos esta práctica... Aprecia esta capacidad que tienes de observar tu propia mente... Es un poder extraordinario... ... Lleva esta conciencia observadora contigo... Durante el día... cuando notes que estás perdido en pensamientos... simplemente regresa a la observación... Al espacio consciente que eres... Eres mucho más que tus pensamientos..."
      }
    ],

    compassion: [
      {
        name: "Práctica de Amor Bondadoso",
        intro: "Bienvenido a esta meditación de amor bondadoso y compasión... Siéntate cómodamente con tu corazón abierto... Coloca una mano en tu pecho... sintiendo tu corazón latir... Este es el centro de tu capacidad natural para amar... Respira suavemente... y permite que tu corazón se ablande...",
        
        breathing: "Comencemos con respiraciones que abran el corazón... Respira hacia tu corazón... imagina que el aire entra directamente a tu centro cardíaco... Y exhala desde tu corazón... irradiando calidez... ... Con cada respiración... siente tu corazón expandirse... volviéndose más cálido... más abierto... más compasivo... ... Continúa respirando amor hacia adentro... y enviando bondad hacia afuera......",
        
        selfCompassion: "Comencemos dirigiendo amor bondadoso hacia ti mismo... Imagina una luz cálida y dorada en tu corazón... Esta es tu bondad natural... tu capacidad de amar... ... Repite mentalmente... 'Que yo sea feliz'... Siente estas palabras llenando tu corazón... ... 'Que yo esté en paz'... Deja que la paz se extienda por todo tu ser... ... 'Que yo esté libre de sufrimiento'... Abraza tu propia experiencia con ternura... ... 'Que yo sea amado'... Porque mereces amor... especialmente el tuyo propio......",
        
        lovedOnes: "Ahora trae a tu mente a alguien que amas... Puede ser un familiar... un amigo... incluso una mascota... Ve su rostro... siente su presencia... ... Dirige este amor bondadoso hacia ellos... 'Que seas feliz'... Ve su felicidad... siéntela en tu corazón... ... 'Que estés en paz'... Imagina que están rodeados de serenidad... ... 'Que estés libre de sufrimiento'... Envía tu deseo de que estén bien... ... 'Que seas amado'... Porque el amor es lo que conecta todos los corazones......",
        
        neutralPerson: "Ahora trae a tu mente a alguien neutral... Quizás alguien que viste hoy... un cajero... un vecino... Alguien por quien no sientes amor ni antipatía... ... Reconoce su humanidad... su deseo de ser feliz... igual que el tuyo... ... Ofrece bondad a esta persona... 'Que seas feliz'... 'Que estés en paz'... 'Que estés libre de sufrimiento'... 'Que seas amado'... ... Siente cómo tu corazón se expande para incluir a esta persona......",
        
        difficultPerson: "Si te sientes preparado... trae a tu mente a alguien con quien tienes dificultades... Comienza con alguien no muy desafiante... ... Reconoce que esta persona... como tú... quiere ser feliz... quiere estar libre de sufrimiento... ... Desde tu corazón abierto... ofrece bondad... 'Que seas feliz'... 'Que estés en paz'... 'Que estés libre de sufrimiento'... 'Que seas amado'... ... Si es difícil... está bien... La práctica es lo que importa......",
        
        allBeings: "Finalmente... extiende tu amor bondadoso a todos los seres... Imagina ondas de compasión irradiando desde tu corazón... ... A todos en tu vecindario... tu ciudad... tu país... ... A todos los seres en toda la tierra... humanos... animales... plantas... ... 'Que todos los seres sean felices'... 'Que todos los seres estén en paz'... 'Que todos los seres estén libres de sufrimiento'... 'Que todos los seres sean amados'... ... Siente la conexión... la bondad universal que compartes con toda la vida......",
        
        closing: "Mientras terminamos esta práctica... Siente la calidez en tu corazón... La expansión de tu compasión... ... Sabe que este amor bondadoso siempre está disponible... En cualquier momento... con cualquier persona... incluido tú mismo... ... Comienza a profundizar tu respiración... Mueve suavemente tu cuerpo... ... Cuando estés listo... abre los ojos... ... Lleva esta bondad contigo... Deja que tu corazón sea una fuente de amor para el mundo......"
      },
      
      {
        name: "Sanación del Corazón Herido",
        intro: "Bienvenido a esta práctica de sanación compasiva... Todos llevamos heridas en el corazón... de palabras duras... de pérdidas... de desilusiones... Hoy vamos a traer gentileza a esos lugares doloridos... Siéntate con las manos en tu corazón... respira suavemente...",
        
        recognition: "Comencemos reconociendo que el sufrimiento es parte de la vida humana... No estás solo en tu dolor... Millones de personas han sentido lo que tú sientes... ... Respira hacia tu corazón... y di silenciosamente... 'Este dolor también forma parte de la vida'... 'No estoy solo en esto'... 'Mi corazón puede sanar'......",
        
        selfTenderness: "Ahora lleva ternura a tu propio dolor... Como si fueras tu mejor amigo... ¿qué te dirías en este momento difícil?... ... Tal vez... 'Has estado haciendo lo mejor que puedes'... 'Es natural sentir dolor'... 'Mereces amor y cuidado'... 'Tu corazón es fuerte y puede sanar'... ... Siente estas palabras como un bálsamo en tu corazón......",
        
        breathingLove: "Respira amor hacia las partes de ti que duelen... Con cada inhalación... imagina luz dorada entrando a los lugares heridos de tu corazón... ... Con cada exhalación... suelta el resentimiento... la amargura... la autocrítica... ... Continúa respirando sanación hacia adentro... y liberando dolor hacia afuera... Tu corazón sabe cómo sanar......",
        
        forgiveness: "Si te sientes preparado... lleva a tu mente a alguien que te ha lastimado... No para excusar su comportamiento... sino para liberar tu corazón... ... Reconoce que aferrarse al dolor te lastima más a ti... Es hora de liberarte... ... Respira y di... 'Te perdono por mi propia paz'... 'Libero este dolor por mi propio bienestar'... Esto no es debilidad... es el acto más valiente......",
        
        heartHealing: "Imagina tu corazón rodeado de luz curativa dorada... Esta luz disuelve el dolor... repara las grietas... fortalece lo que se había debilitado... ... Siente tu corazón volviéndose más fuerte... más sabio... más compasivo por haber pasado por el dolor... ... El corazón que ha sido herido y sanado es el más hermoso de todos......",
        
        closing: "Mientras terminamos esta sanación... Siente la nueva fuerza en tu corazón... el espacio que has creado para más amor... ... Sabe que la sanación es un proceso... sé paciente contigo mismo... ... Lleva esta ternura contigo... Tu corazón sanado ahora puede ser fuente de sanación para otros..."
      },
      
      {
        name: "Círculo de Compasión Universal",
        intro: "Bienvenido a esta práctica de expansión compasiva... Vamos a comenzar contigo y expandir círculos de amor hasta incluir a todos los seres... Imagina que estás en el centro de círculos concéntricos de luz... Cada círculo representa un nivel de conexión... Respira profundamente y permite que tu corazón se abra...",
        
        innerCircle: "Comienza con el círculo más íntimo... Tú y tu familia más cercana... aquellos que amas profundamente... Visualiza sus rostros... siente el amor natural que tienes por ellos... ... Envía bendiciones a este círculo... 'Que seamos felices... Que estemos sanos... Que estemos en paz... Que vivamos en armonía'... ... Siente la calidez de este amor familiar llenando tu corazón......",
        
        secondCircle: "Ahora expande al segundo círculo... Tus amigos... compañeros de trabajo... conocidos... personas que ves regularmente... ... Incluye a todos aquellos con quienes tienes una relación positiva... Ve sus rostros... siente la conexión... ... Envía las mismas bendiciones... 'Que sean felices... Que estén sanos... Que estén en paz... Que vivan con alegría'... ... Nota cómo tu corazón puede abarcar a más personas......",
        
        thirdCircle: "Expande al tercer círculo... Personas neutrales... extraños que has visto... gente en la calle... en tiendas... en transporte público... ... Reconoce que cada una de estas personas tiene una vida completa... sueños... luchas... esperanzas... igual que tú... ... Ofrece bendiciones a todos... 'Que encuentren felicidad... Que estén libres de sufrimiento... Que encuentren paz'... ... Siente tu compasión expandiéndose más allá de lo familiar......",
        
        fourthCircle: "Ahora incluye el círculo más desafiante... Personas con las que tienes conflictos... aquellos que te han lastimado... incluso enemigos... ... Esto no significa aprobar sus acciones... sino reconocer su humanidad... ... Con gran valentía del corazón... susurra... 'Que encuentres paz en tu corazón... Que tu sufrimiento disminuya... Que encuentres el camino hacia la felicidad'... ... Esta es la compasión más poderosa......",
        
        universalCircle: "Finalmente... expande tu compasión a todos los seres en el universo... Humanos... animales... plantas... toda la vida... ... Imagina la Tierra desde el espacio... todos compartiendo este hogar... todos interconectados... ... Con un corazón completamente abierto... envía amor universal... 'Que todos los seres sean libres de sufrimiento... Que todos los seres encuentren felicidad... Que todos los seres vivan en paz'... ... Siente tu conexión con toda la vida......",
        
        integration: "Ahora trae toda esta compasión de vuelta a ti... Siente cómo tu corazón se ha expandido... cómo has crecido en tu capacidad de amar... ... Eres parte de esta red infinita de conexión... tanto dando como recibiendo amor... ... Lleva esta perspectiva expandida contigo... Ve a todos los seres como parte de tu familia universal......",
        
        closing: "Mientras completamos este círculo de compasión... Siente la transformación en tu corazón... Tu capacidad de amar se ha expandido exponencialmente... ... Recuerda que toda la humanidad está conectada... somos una familia global... ... Sal al mundo con este corazón abierto... sé un embajador de compasión... Tu amor puede cambiar el mundo..."
      }
    ],

    walking: [
      {
        name: "Práctica de Caminar Consciente",
        intro: "Bienvenido a esta meditación de caminar consciente... Mientras que tradicionalmente caminamos para llegar a algún lugar... hoy caminamos para estar completamente presentes... No hay destino... solo el viaje... Comienza de pie... sintiendo tus pies en el suelo... tu cuerpo balanceado y alerta...",
        
        preparation: "Antes de comenzar a caminar... toma un momento para centrarte... Siente el peso de tu cuerpo... la estabilidad de tus piernas... ... Respira profundamente... y establece la intención de caminar con conciencia plena... Cada paso será una oportunidad para estar presente... ... Mira hacia adelante con ojos suaves... no enfocándote en nada específico... simplemente abierto a la experiencia......",
        
        beginningSteps: "Ahora comienza a caminar muy lentamente... Levanta un pie... siente el cambio de peso... coloca el pie suavemente en el suelo... ... Levanta el otro pie... nota la sensación de movimiento... el balanceo de tu cuerpo... coloca el pie conscientemente... ... Cada paso es completo en sí mismo... No hay prisa... no hay lugar al que llegar... solo este paso... luego el siguiente......",
        
        mindfulWalking: "Continúa caminando a este ritmo meditativo... Siente la conexión entre tus pies y la tierra... El peso trasladándose de un pie al otro... ... Nota cómo tu cuerpo se mueve naturalmente... El balanceo de tus brazos... el ritmo de tus pasos... la coordinación milagrosa del caminar... ... Cuando tu mente divague... y lo hará... simplemente regresa tu atención a la sensación del caminar... El contacto del pie con el suelo... el levantamiento... el movimiento... el contacto nuevamente......",
        
        awareness: "Expande tu conciencia para incluir todo lo que te rodea... Nota los sonidos... los olores... los colores... sin perder la conexión con tus pasos... ... Siente el aire en tu piel... la temperatura... cualquier brisa... Todo es parte de esta experiencia de caminar consciente... ... Cada momento es único... cada paso es una oportunidad para despertar... para estar completamente vivo en este momento......",
        
        gratitude: "Mientras continúas caminando... siente gratitud por esta capacidad de moverte... por tus piernas que te cargan... por tu cuerpo que te permite explorar el mundo... ... Gratitud por este momento de calma en tu día... por esta oportunidad de practicar la presencia... ... Cada paso es un regalo... cada respiración es una bendición......",
        
        closing: "Ahora comienza a reducir gradualmente tu ritmo... hasta detenerte suavemente... Párate por un momento... sintiendo la quietud después del movimiento... ... Respira profundamente... y aprecia esta experiencia de caminar consciente... ... Sabe que puedes llevar esta conciencia a cualquier momento que camines... Cada paso puede ser una meditación... cada movimiento una oportunidad para la presencia... ... Cuando estés listo... continúa con tu día... pero mantén esta calidad de conciencia... Esta es la práctica de vivir despierto......"
      },
      
      {
        name: "Caminata de Conexión con la Tierra",
        intro: "Bienvenido a esta caminata meditativa de conexión terrestre... Vamos a usar el simple acto de caminar para reconectarnos con la Tierra... nuestro hogar... nuestra fuente... Si es posible... practica esto al aire libre... en la naturaleza... pero si estás adentro... visualiza que caminas sobre la tierra...",
        
        grounding: "Comienza de pie con los pies descalzos si es posible... o imagina que lo estás... Siente la solidez de la tierra debajo de ti... Esta tierra te ha sostenido toda tu vida... ... Respira profundamente y siente tu conexión con este planeta... Cada molécula de tu cuerpo una vez fue parte de la tierra... del aire... del agua... Eres tierra caminando......",
        
        earthConnection: "Con cada paso... imagina que tus pies besan la tierra... Siente la gratitud fluyendo desde tus pies hacia la tierra... agradeciendo su soporte... ... La tierra te da todo lo que necesitas... comida... agua... aire... refugio... Con cada paso... envía amor de vuelta... ... 'Gracias tierra por sostenerme'... 'Gracias por todo lo que me das'... 'Soy tu hijo/hija caminando sobre ti con amor'......",
        
        naturalRhythm: "Encuentra el ritmo natural de la tierra... No el prisa de la ciudad... sino el ritmo lento y constante de la naturaleza... Como el crecimiento de los árboles... el flujo de los ríos... el movimiento de las nubes... ... Deja que tus pasos sigan este ritmo ancestral... Estás participando en la danza eterna de la vida en la Tierra......",
        
        elementalAwareness: "Mientras caminas... siente todos los elementos... La tierra sólida bajo tus pies... El agua en tu cuerpo y en el aire... El fuego del sol calentándote... El aire que respiras... ... Eres una expresión caminante de todos estos elementos... Eres la tierra experimentándose a sí misma a través de tus sentidos......",
        
        ancestralSteps: "Imagina que caminas por los mismos senderos que han caminado tus ancestros... por miles de años... Humanos han caminado sobre esta tierra... sintiendo los mismos elementos... respirando el mismo aire... ... Eres parte de una cadena ininterrumpida de vida... conectado a todos los que han caminado antes... y todos los que caminarán después......",
        
        healing: "Con cada paso... imagina que estás sanando la tierra... Tu amor... tu presencia consciente... tu gratitud... todo esto es sanación para nuestro planeta... ... La tierra necesita tu amor... tu respeto... tu cuidado... Con cada paso consciente... estás bendiciendo la tierra... estás siendo parte de la solución......",
        
        closing: "Mientras terminas esta caminata sagrada... detente y coloca ambas manos en la tierra si puedes... o imagínalo... ... Siente la conexión... eres hijo/hija de esta tierra... ella es tu madre... tu hogar... ... Lleva esta conexión contigo... recuerda que cada paso puede ser una bendición para la tierra... cada caminata una oportunidad para honrar tu hogar planetario..."
      },
      
      {
        name: "Caminata de Liberación Mental",
        intro: "Bienvenido a esta caminata meditativa para liberar la mente... A veces nuestros pensamientos se vuelven pegajosos... atascados en bucles... Esta práctica usa el movimiento físico para liberar patrones mentales rígidos... Comienza de pie... sintiendo tu cuerpo listo para moverse y liberar...",
        
        intention: "Antes de comenzar... identifica qué necesitas liberar... ¿Hay pensamientos repetitivos?... ¿Preocupaciones que dan vueltas?... ¿Emociones atascadas?... ... No necesitas analizarlos... solo reconoce que algo necesita moverse... ... Establece la intención de usar esta caminata para liberar lo que ya no necesitas... Como hojas que caen de un árbol en otoño......",
        
        releasingSteps: "Comienza a caminar con pasos deliberados... Con cada paso izquierdo... di mentalmente 'libero'... Con cada paso derecho... di 'lo que no necesito'... ... Izquierda... 'libero'... Derecha... 'lo que no necesito'... ... Siente que con cada paso estás literalmente dejando atrás pensamientos viejos... como si los dejaras en el camino detrás de ti......",
        
        shaking: "Ahora mientras caminas... permite que tu cuerpo se mueva libremente... Rueda tus hombros... mueve tus brazos... incluso sacude tu cabeza suavemente... ... Los animales se sacuden naturalmente para liberar tensión y trauma... Tu cuerpo sabe cómo liberar... permítele moverse... ... Este movimiento libera no solo tensión física... sino también energía mental estancada......",
        
        breathAndRelease: "Mientras continúas caminando... usa la respiración para la liberación... Inhala... recogiendo toda la tensión mental... Exhala fuertemente por la boca... 'HAAAA'... liberando... ... Con cada exhalación... imagina que estás soplando nubes grises de preocupación... alejándolas de ti... El viento se las lleva... Ya no son tuyas......",
        
        freshStart: "Ahora camina como si fuera la primera vez... Como si hubieras acabado de nacer y todo fuera nuevo... Los colores más brillantes... los sonidos más claros... ... Tu mente es ahora como un cielo despejado después de una tormenta... Espaciosa... clara... libre... ... Cada paso es un paso hacia una nueva forma de ser... más ligera... más libre......",
        
        integration: "Mientras reduces el ritmo... siente la diferencia en tu estado mental... Nota el espacio que has creado... la claridad que has encontrado... ... Este es tu estado natural... espacioso y libre... Los pensamientos pueden venir y ir... pero no tienes que aferrarte a ellos... ... Puedes usar la caminata consciente cuando sea para volver a este estado de libertad mental......",
        
        closing: "Detente suavemente... para un momento en quietud... Siente la liberación que has logrado... la ligereza en tu mente... ... Sabe que siempre puedes regresar a esta práctica... cuando la mente se sienta atascada... el movimiento consciente es medicina... ... Lleva esta sensación de libertad mental contigo... eres libre de elegir tus pensamientos... libre de soltar lo que no sirve..."
      }
    ],

    breathing: [
      {
        name: "Práctica de Respiración Completa",
        intro: "Bienvenido a esta meditación de respiración completa... Siéntate cómodamente con tu espalda erguida... Coloca una mano en tu pecho y otra en tu vientre... Vamos a explorar la respiración profunda y natural... la base de toda práctica meditativa... Cierra suavemente los ojos y conéctate con tu respiración actual...",
        
        naturalBreathing: "Comencemos simplemente observando tu respiración natural... Sin cambiar nada... solo nota cómo respiras normalmente... ... Siente el aire entrando y saliendo... El ritmo natural de tu cuerpo... ... Nota si respiras más por la nariz o por la boca... si tu respiración es superficial o profunda... rápida o lenta... ... No hay respiración correcta o incorrecta... solo conciencia de lo que es......",
        
        deepBreathing: "Ahora comencemos a profundizar suavemente la respiración... Respira lentamente por la nariz... permitiendo que el aire llene primero tu vientre... ... Siente tu mano en el vientre subir... tu diafragma expandirse... ... Continúa llenando tu pecho... siente tu mano en el pecho subir... costillas expandiéndose... ... Haz una pausa suave en la parte superior de la inhalación... sosteniendo toda esta vitalidad... ... Ahora exhala lentamente... permitiendo que el aire salga suavemente de tu pecho... luego de tu vientre... ... Siente tu cuerpo relajarse con cada exhalación......",
        
        rhythmicBreathing: "Ahora estableceremos un ritmo calmante... Inhala durante cuatro cuentas... uno... dos... tres... cuatro... ... Pausa suavemente... uno... dos... ... Exhala durante seis cuentas... uno... dos... tres... cuatro... cinco... seis... ... Pausa natural... uno... dos... ... Continúa con este ritmo... cuatro adentro... pausa... seis afuera... pausa... ... Este patrón activa tu sistema nervioso parasimpático... tu respuesta natural de relajación......",
        
        energizingBreath: "Ahora probaremos una respiración más energizante... Inhala vigorosamente por la nariz durante tres cuentas... uno... dos... tres... ... Exhala con fuerza por la boca con un sonido 'AH'... uno... dos... tres... ... Otra vez... inhala energía y vitalidad... uno... dos... tres... ... Exhala cualquier fatiga o pesadez... AH... uno... dos... tres... ... Continúa algunas veces más... sintiendo cómo cada respiración te energiza......",
        
        balancingBreath: "Ahora una respiración para equilibrar... Cierra tu fosa nasal derecha con tu pulgar... Inhala por la fosa nasal izquierda durante cuatro cuentas... ... Cierra la fosa nasal izquierda con tu dedo anular... quita el pulgar... exhala por la fosa nasal derecha durante cuatro cuentas... ... Inhala por la fosa nasal derecha... cierra con el pulgar... exhala por la fosa nasal izquierda... ... Continúa este patrón... alternando... balanceando los dos lados de tu sistema nervioso... ... Esto crea equilibrio y calma......",
        
        returningToNatural: "Ahora suelta cualquier técnica... regresa a tu respiración natural... Pero mantén la conciencia que has desarrollado... ... Nota cómo se siente tu respiración ahora... Quizás más profunda... más suave... más consciente... ... Cada respiración es una oportunidad para estar presente... para nutrir tu cuerpo... para calmar tu mente......",
        
        closing: "Mientras terminamos esta práctica de respiración... Siente la quietud en tu cuerpo... la claridad en tu mente... ... Sabe que tu respiración es tu compañía constante... Siempre disponible... siempre presente... ... Comienza a profundizar tu respiración... Mueve suavemente tus dedos y dedos de los pies... ... Cuando estés listo... abre los ojos lentamente... ... Lleva esta conciencia respiratoria contigo... Recuerda que en cualquier momento puedes regresar a tu respiración... para centrarte... para calmarte... para estar presente......"
      },
      
      {
        name: "Respiración del Océano",
        intro: "Bienvenido a la respiración del océano... Esta práctica imita el sonido rítmico de las olas... creando calma profunda y tranquilidad interior... Siéntate cómodamente... imagina que estás junto al mar... escuchando el eterno ritmo del océano... Tu respiración se convertirá en olas de paz...",
        
        listening: "Primero... escucha tu respiración natural... ¿Puedes oír un sonido sutil cuando respiras?... ... Ahora vamos a hacer este sonido más audible... como el susurro suave del océano... Esto se llama respiración Ujjayi... el aliento del mar......",
        
        technique: "Inhala lentamente por la nariz... cerrando ligeramente la garganta... como si estuvieras empañando un espejo... pero con la boca cerrada... ... Deberías escuchar un sonido suave... como 'AAAHH'... similar al sonido del océano... ... Exhala de la misma manera... con el mismo sonido suave... manteniendo la boca cerrada... ... Este es el sonido de tu océano interior......",
        
        rhythm: "Encuentra un ritmo como las olas del mar... Inhala lentamente... escuchando el sonido del océano... cuatro... cinco... seis segundos... ... Exhala lentamente... mismo sonido... misma duración... cuatro... cinco... seis segundos... ... Como olas que llegan y se retiran... llegan y se retiran... ... Tu respiración es ahora el ritmo eterno del océano......",
        
        visualization: "Mientras respiras como el océano... visualiza olas azules fluyendo en tu cuerpo... Con cada inhalación... olas de calma entran a tu ser... ... Con cada exhalación... olas de tensión se alejan... llevándose el estrés... ... Tu cuerpo es como una playa... y las olas de tu respiración te están limpiando... relajando... sanando......",
        
        deepening: "Continúa con esta respiración oceánica... Cada ola más profunda... más tranquilizadora... ... Siente como si estuvieras flotando en un mar interno de paz... Sostenido por las olas de tu propia respiración... ... El sonido del océano te está llenando de serenidad... Tu mente se calma como aguas tranquilas......",
        
        presence: "Con cada respiración oceánica... regresa al momento presente... El océano siempre está aquí ahora... Nunca en el pasado... nunca en el futuro... siempre en este momento... ... Tu respiración oceánica te ancla en la presencia... Como un faro en la costa... siempre estable... siempre aquí......",
        
        closing: "Gradualmente... permite que el sonido del océano se vuelva más suave... pero mantén esa calidad profunda y tranquila... ... Tu respiración oceánica está siempre disponible... en cualquier momento que necesites calma... simplemente regresa al sonido del mar interior... ... Cuando abras los ojos... lleva contigo esta paz oceánica... Eres vasto como el mar... profundo como el océano..."
      },
      
      {
        name: "Respiración de Fuego Transformador",
        intro: "Bienvenido a la respiración de fuego transformador... Esta práctica usa la respiración para quemar lo que ya no necesitas... transformando energía estancada en vitalidad... Siéntate erguido... imagina un fuego sagrado en tu vientre... listo para purificar y energizar...",
        
        preparation: "Coloca tus manos en tu vientre bajo... Siente tu centro de poder... tu núcleo... Aquí es donde encenderemos el fuego transformador... ... Respira naturalmente por unos momentos... conectándote con tu centro... Establece la intención de liberar lo viejo y dar la bienvenida a lo nuevo... ... Este fuego no destruye... transforma... convierte lo denso en luz... lo pesado en liviano......",
        
        ignition: "Ahora vamos a encender el fuego... Inhala profundamente... llenando tu vientre de aire... ... Exhala rápido y fuerte por la nariz... 'HU'... contrayendo tu vientre hacia adentro... ... Otra vez... inhala llenando... exhala rápido 'HU'... contrayendo... ... Continúa... inhala profundo... exhala fuerte... Siente el calor generándose en tu centro......",
        
        building: "Continúa esta respiración de fuego... Inhalaciones profundas... exhalaciones rápidas y fuertes... Siente el fuego creciendo en tu vientre... ... Este fuego está quemando todo lo que ya no necesitas... miedos viejos... resentimientos... autocríticas... ... Con cada exhalación explosiva... estás liberando energía atascada... Con cada inhalación... estás avivando el fuego de tu transformación......",
        
        visualization: "Visualiza llamas doradas en tu centro... creciendo más brillantes con cada respiración... Este fuego se extiende por todo tu cuerpo... ... Las llamas suben por tu columna... limpian tu corazón... iluminan tu mente... ... Todo lo que no es auténtico se está quemando... dejando solo tu esencia pura... tu verdadero ser radiante......",
        
        integration: "Ahora permite que la respiración se calme gradualmente... Pero mantén la sensación de calor... la energía transformada... ... Siente el poder en tu centro... purificado y renovado... Tu fuego interior ahora brilla limpio y claro... ... Este es tu fuego sagrado... tu poder personal transformado... tu capacidad de crear cambio en tu vida......",
        
        cooling: "Para completar la transformación... toma tres respiraciones largas y lentas... Como brisa fresca que calma el fuego... ... Inhala serenidad... exhala suavemente... Inhala paz... exhala suavemente... Inhala nueva energía... exhala suavemente... ... El fuego se ha establecido en una llama estable y poderosa... El proceso de transformación está completo......",
        
        closing: "Coloca ambas manos en tu corazón... Siente la nueva energía que has creado... la vitalidad que has liberado... ... Sabe que siempre puedes acceder a este fuego transformador... cuando necesites cambio... cuando te sientas atascado... ... Lleva esta energía transformada contigo... Eres capaz de cambiar... de crecer... de transformarte... El fuego sagrado vive en ti..."
      }
    ],

    morning: [
      {
        name: "Práctica de Despertar del Amanecer",
        intro: "Bienvenido a esta meditación matutina del despertar... Siéntate cómodamente mientras tu cuerpo despierta suavemente... Imagina que eres como el sol naciente... lleno de potencial... listo para brillar... Respira profundamente... y permite que tu energía natural comience a despertar... Este es tu momento de prepararte para el día que está por venir...",
        
        awakening: "Comencemos despertando tu cuerpo suavemente... Toma una respiración profunda... llenando todo tu ser con aire fresco y oxígeno... ... Siente tu cuerpo despertando... tus células cobrando vida... tu energía comenzando a fluir... ... Estira suavemente tus brazos sobre tu cabeza... sintiendo el espacio en tu pecho... la apertura en tu corazón... ... Rueda tus hombros... mueve tu cuello suavemente... permitiendo que tu cuerpo se despierte naturalmente......",
        
        breathingPractice: "Ahora usemos la respiración para energizar... Inhala profundamente por la nariz... imagina que estás respirando luz dorada... energía del sol... ... Exhala cualquier cansancio o pesadez de la noche... soplando suavemente por la boca... ... Otra vez... inhala vitalidad... fuerza... posibilidad... ... Exhala cualquier duda o preocupación... liberando todo lo que no necesitas hoy... ... Continúa respirando energía hacia adentro... y liberando limitaciones hacia afuera......",
        
        intention: "Ahora es momento de establecer tu intención para el día... Pregúntate... ¿Cómo quiero ser hoy?... ¿Qué cualidades quiero encarnar?... ... Tal vez quieras ser más paciente... más amoroso... más enfocado... más presente... ... Siente esta intención en tu corazón... Visualízate viviendo este día con estas cualidades... ... Imagina interacciones llenas de esta energía... desafíos enfrentados con estas fortalezas... ... Tu intención es como una semilla... plantada en el suelo fértil de tu corazón......",
        
        gratitude: "Tomemos un momento para la gratitud matutina... Piensa en tres cosas por las que estás agradecido... ... Tal vez por este nuevo día... por tu salud... por las personas que amas... por oportunidades que tienes... ... Siente esta gratitud expandiéndose en tu pecho... llenándote de calidez... ... La gratitud es como el sol... ilumina todo lo que toca... ... Deja que esta apreciación llene cada célula de tu cuerpo... preparándote para ver la belleza en el día que tienes por delante......",
        
        energyVisualization: "Imagina una luz dorada brillante en el centro de tu pecho... Esta es tu energía del amanecer... tu vitalidad natural... ... Con cada respiración... esta luz se vuelve más brillante... más fuerte... ... Siente esta energía expandiéndose por todo tu cuerpo... hacia arriba por tu pecho... cuello... cabeza... ... Hacia abajo por tu vientre... caderas... piernas... hasta los dedos de los pies... ... Hacia los lados por tus brazos... hasta las puntas de tus dedos... ... Todo tu cuerpo brilla con esta energía del amanecer... listo para brillar en el mundo......",
        
        affirmations: "Repetamos algunas afirmaciones para comenzar el día... 'Hoy es un nuevo comienzo'... ... 'Estoy lleno de energía y posibilidad'... ... 'Abrazo este día con entusiasmo'... ... 'Soy capaz de manejar cualquier cosa que venga'... ... 'Elijo ver oportunidades en lugar de obstáculos'... ... 'Mi corazón está abierto a la alegría'... ... 'Hoy hago una diferencia positiva'... ... Siente estas afirmaciones hundiéndose profundamente en tu ser......",
        
        closing: "Mientras terminamos esta práctica matutina... Siente la vitalidad corriendo por tus venas... la claridad en tu mente... el propósito en tu corazón... ... Estás despierto... consciente... y listo para abrazar este día... ... Comienza a moverte como se sienta bien... Tal vez estira... rueda tus hombros... sonríe... ... Cuando estés listo... abre los ojos y abraza este nuevo día... ... Lleva esta energía del amanecer contigo... Eres la luz... y es tu momento de brillar......"
      },
      
      {
        name: "Ritual de Preparación del Guerrero",
        intro: "Bienvenido a este ritual matutino del guerrero interior... No un guerrero de violencia... sino un guerrero de vida... un guerrero de propósito... un guerrero de amor... Siéntate erguido... con dignidad... como un guerrero preparándose para la batalla de vivir plenamente...",
        
        warriorPosture: "Adopta la postura del guerrero... Columna recta... hombros hacia atrás... pecho abierto... barbilla ligeramente levantada... ... Esta no es arrogancia... es dignidad... Es la postura de alguien que está listo para enfrentar lo que venga... ... Siente la fuerza en tu postura... Tu cuerpo comunica poder... confianza... preparación... Eres un guerrero despertando......",
        
        breathOfPower: "Respira como un guerrero... Inhalaciones profundas y poderosas... llenando todo tu ser con fuerza vital... ... Exhala con poder... 'HAAA'... liberando cualquier debilidad... cualquier duda... ... Otra vez... inhala fuerza... exhala 'HAAA'... poder... ... Siente cómo cada respiración te fortalece... te prepara... te energiza para las batallas del día......",
        
        innerWarrior: "Conecta con tu guerrero interior... Esa parte de ti que nunca se rinde... que siempre se levanta... que enfrenta desafíos con valor... ... Este guerrero ha estado contigo toda tu vida... en cada momento difícil... en cada triunfo... ... Honra a este guerrero... agradece su protección... su fuerza... su resistencia... ... Hoy caminarás con la fuerza del guerrero......",
        
        mission: "Todo guerrero necesita una misión... ¿Cuál es tu misión hoy?... ¿Por qué luchas?... ¿Qué defiendes?... ... Tal vez luchas por la felicidad de tu familia... por tu crecimiento personal... por hacer una diferencia en el mundo... ... Siente esta misión en tu corazón... Tu propósito te da fuerza... te da dirección... te hace invencible... ... Eres un guerrero con una causa sagrada......",
        
        armorOfLove: "Ahora ponte la armadura del guerrero... Pero esta armadura está hecha de amor... compasión... sabiduría... ... Coloca el casco de claridad mental... Ponte la coraza de corazón abierto... Los guantes de manos gentiles... Las botas de pasos conscientes... ... Esta armadura te protege no endureciéndote... sino manteniéndote suave pero fuerte... amoroso pero poderoso......",
        
        warriorPledge: "Haz el juramento del guerrero de la vida... Repite mentalmente... 'Hoy elijo el valor sobre el miedo'... ... 'Elijo el amor sobre el odio'... ... 'Elijo la acción sobre la parálisis'... ... 'Elijo la esperanza sobre la desesperación'... ... 'Soy un guerrero de luz... y hoy brillaré'... ... Siente estas palabras grabándose en tu alma......",
        
        readyForBattle: "Ahora estás preparado... equipado no con espadas... sino con amor... No con escudos... sino con sabiduría... No con lanzas... sino con compasión... ... Eres un guerrero completo... preparado para cualquier batalla que el día traiga... ... Las batallas de la paciencia... del perdón... de la perseverancia... de mantener el corazón abierto en un mundo difícil......",
        
        closing: "Levántate como el guerrero que eres... Camina al mundo con dignidad... con propósito... con fuerza interior... ... Recuerda... no peleas contra otros... peleas por el bien más alto... por el amor... por la verdad... por la vida plena... ... Eres un guerrero de la luz... Y este es tu día para brillar con valor y compasión..."
      },
      
      {
        name: "Ceremonia de Nacimiento del Día",
        intro: "Bienvenido a esta ceremonia sagrada del nacimiento del día... Cada amanecer es un nacimiento... el universo dando a luz a un nuevo día... Y tú eres parte de este milagro... testigo y participante en la creación continua... Siéntate en posición de testigo sagrado... preparándote para recibir este nuevo día...",
        
        cosmicAwareness: "Toma conciencia de tu lugar en el cosmos... En este momento... la Tierra está girando hacia el sol... exponiendo tu parte del mundo a la luz... ... Tú eres parte de este baile cósmico... Millones de personas están despertando contigo... millones de vidas comenzando un nuevo día... ... Siente tu conexión con toda la humanidad... todos compartiendo este momento de transición... de noche a día... de sueño a vigilia......",
        
        witnessing: "Sé testigo del milagro del despertar... Dentro de ti... células se están activando... procesos biológicos comenzando... tu consciencia emergiendo del sueño... ... Es un milagro que despiertes cada día... que tu corazón lata... que tu mente se active... que puedas experimentar la vida... ... No es algo garantizado... es un regalo precioso... Recibe este regalo con asombro......",
        
        rebirth: "Cada día eres renacido... El tú de ayer ha muerto en el sueño... El tú de hoy está naciendo ahora... ... ¿Quién quieres ser en este nuevo nacimiento?... ¿Qué versión de ti quieres traer al mundo?... ... Puedes elegir ser más sabio que ayer... más amoroso... más presente... más auténtico... ... Este es tu día de nacimiento... puedes nacer como quien quieras ser......",
        
        blessings: "Recibe las bendiciones del nuevo día... El sol te bendice con luz... El aire te bendice con vida... La Tierra te bendice con soporte... ... Tu corazón te bendice con amor... Tu mente te bendice con conciencia... Tu alma te bendice con propósito... ... Eres un ser bendecido... viviendo en un día bendecido... en un universo bendecido......",
        
        offering: "¿Qué ofreces a cambio de este regalo del día?... ¿Cómo honrarás este nuevo comienzo?... ... Tal vez ofreces tu presencia... tu amor... tu servicio... tu creatividad... tu alegría... ... Haz una ofrenda silenciosa al día... un compromiso de cómo usarás este regalo de tiempo y vida... ... Tu vida es tanto un regalo recibido como una ofrenda dada......",
        
        dedication: "Dedica este día a algo más grande que tú... Tal vez a tu familia... a la humanidad... a la Tierra... al crecimiento... al amor... ... Cuando dedicamos nuestro día... se vuelve sagrado... Cada acción se convierte en una oración... cada momento en una ofrenda... ... Tu día ya no es ordinario... es una ceremonia viviente......",
        
        emergence: "Ahora emerge completamente en este nuevo día... Como una mariposa saliendo de su capullo... como el sol emergiendo del horizonte... ... Sientes la energía de la creación fluyendo através de ti... Eres parte del impulso creativo del universo... ... Levántate y entra al día no como alguien ordinario... sino como una expresión sagrada de la vida misma......",
        
        closing: "La ceremonia del nacimiento del día está completa... Has sido testigo del milagro... has recibido las bendiciones... has hecho tu ofrenda... ... Ahora ve al mundo como un ser sagrado... viviendo un día sagrado... cada momento una parte de la gran ceremonia de la vida... Que tu día sea una bendición para todos los que encuentres..."
      }
    ]
  },

  // French meditation templates
  fr: {
    sleep: [
      {
        name: "Scan Corporel pour Dormir",
        intro: "Bienvenue dans cette méditation paisible pour dormir... Trouvez une position confortable dans votre lit... laissez votre corps s'enfoncer dans le matelas... Fermez doucement les yeux et commencez à remarquer votre respiration... Il n'y a rien que vous devez faire maintenant... sauf vous détendre et écouter ma voix...",
        
        breathing: "Commençons par quelques respirations apaisantes... Respirez lentement par le nez... comptez jusqu'à cinq... un... deux... trois... quatre... cinq... Retenez doucement votre souffle... un... deux... trois... quatre... cinq... Et maintenant expirez lentement par la bouche... un... deux... trois... quatre... cinq... Laissez votre respiration revenir à son rythme naturel... vous vous sentez plus détendu à chaque respiration......",
        
        bodyRelaxation: "Maintenant, nous allons faire un doux scan corporel pour relâcher toute tension... Commencez par porter votre attention sur vos pieds... Sentez-les devenir lourds et chauds... Laissez cette lourdeur remonter par vos chevilles... vos mollets... vos genoux... Sentez vos jambes s'enfoncer plus profondément dans le lit... ... Maintenant, portez votre attention sur vos hanches et le bas de votre dos... Laissez-les s'adoucir et se relâcher... Sentez votre ventre monter et descendre à chaque respiration... Votre poitrine s'expandant doucement... ... Amenez votre conscience à vos épaules... Laissez-les tomber loin de vos oreilles... Sentez le poids de vos bras... lourds et détendus... Vos mains reposant paisiblement... ... Remarquez votre cou... Laissez-le s'allonger et s'adoucir... Votre mâchoire se détend... Votre visage devient paisible... Même les petits muscles autour de vos yeux se relâchent......",
        
        visualization: "Imaginez-vous dans un lieu paisible... Peut-être êtes-vous allongé sur un nuage doux... flottant doucement à travers un ciel étoilé... Ou peut-être vous reposez-vous dans un beau jardin... entouré par le doux parfum de la lavande... L'air a la température parfaite... Vous vous sentez complètement en sécurité et protégé... ... À chaque respiration, vous dérivez plus profondément dans la relaxation... Votre esprit devient silencieux et tranquille... comme un lac calme reflétant la lune... Toute pensée qui surgit flotte simplement comme des nuages... Vous n'avez besoin de vous accrocher à rien......",
        
        affirmations: "Alors que vous reposez ici dans une paix parfaite... sachez que... Vous êtes en sécurité... Vous êtes au chaud... Vous êtes protégé... Vous êtes aimé... ... Votre corps sait comment dormir... Il est sûr de lâcher prise maintenant... Vous méritez ce repos... Demain prendra soin de lui-même... ... En ce moment... dans cet instant... tout est exactement comme cela devrait être......",
        
        closing: "Continuez à vous reposer dans cet état paisible... Votre corps est lourd et détendu... Votre esprit est calme et silencieux... À chaque respiration, vous sombrez plus profondément dans un sommeil réparateur... ... Je vous laisse maintenant dériver vers des rêves paisibles... Dormez bien... Reposez-vous profondément... Et réveillez-vous rafraîchi quand ce sera le moment... Doux rêves......"
      },
      {
        name: "Voyage au Jardin de Sommeil",
        intro: "Bienvenue dans ce voyage vers le jardin secret du sommeil... Ce soir, nous allons voyager ensemble vers un lieu magique... un jardin où règne une paix profonde... Installez-vous confortablement et préparez-vous pour ce voyage nocturne...",
        
        entranceToGarden: "Imaginez que vous marchez sur un sentier doux et moussu... Vos pieds nus touchent la terre tiède... Devant vous s'ouvre une porte dorée... C'est l'entrée du jardin de sommeil... ... Poussez doucement la porte... Elle s'ouvre sans bruit... Vous entrez dans le jardin le plus paisible que vous ayez jamais vu... L'air sent la lavande et le jasmin... Une brise douce caresse votre peau......",
        
        magicalElements: "Ce jardin est rempli de merveilles apaisantes... Des fontaines murmurent doucement... Leurs sons créent une mélodie hypnotique... Des fleurs nocturnes brillent d'une lumière tendre... Elles éclairent votre chemin vers le repos... ... Au centre du jardin se trouve un lit de mousse dorée... Plus doux que la soie... Plus confortable que tout ce que vous avez connu... C'est votre lit de sommeil magique......",
        
        restingPlace: "Allongez-vous sur cette mousse dorée... Elle épouse parfaitement la forme de votre corps... Vous vous sentez porté... soutenu par la terre elle-même... ... Au-dessus de vous, les étoiles forment un dais protecteur... Leur lumière douce vous berce... Vous êtes en sécurité dans ce jardin... Rien ne peut vous déranger ici......",
        
        sleepSpells: "Les fleurs du jardin commencent à chanter une berceuse silencieuse... Leurs vibrations pénètrent votre corps... relâchant chaque muscle... chaque tension... ... La fontaine magique coule avec l'eau du sommeil... Chaque goutte qui tombe vous aide à sombrer plus profondément... Plus vous écoutez... plus vous vous endormez......",
        
        deepSleep: "Maintenant les gardiens du sommeil viennent vous visiter... Ce sont des esprits bienveillants... Ils veillent sur votre repos... Ils posent leurs mains invisibles sur votre front... bénissant votre sommeil... ... Vous dérivez maintenant vers les rêves les plus beaux... Dans ce jardin magique... votre âme se repose... se régénère... se prépare pour un nouveau jour......",
        
        closing: "Restez dans ce jardin de sommeil... Il est vôtre pour toute la nuit... Les esprits gardiens veillent... Les étoiles vous protègent... La mousse dorée vous porte... Dormez en paix... rêvez en beauté... Et réveillez-vous comme une fleur qui s'épanouit au matin..."
      },
      {
        name: "Descente dans les Profondeurs Tranquilles",
        intro: "Bienvenue dans cette descente méditative vers le sommeil profond... Imaginez que vous descendez lentement dans les profondeurs tranquilles de votre être... Chaque niveau plus paisible que le précédent... Préparez-vous pour ce voyage vers l'intérieur...",
        
        firstLevel: "Nous commençons au premier niveau de relaxation... Ici votre corps commence à se détendre... Sentez vos épaules qui tombent... vos mâchoires qui se desserrent... ... Respirez profondément et descendez plus bas... vers le deuxième niveau... Ici votre respiration devient plus lente... plus profonde... Votre cœur bat plus calmement......",
        
        deeperLevels: "Descendez maintenant au troisième niveau... Ici vos pensées deviennent floues... moins importantes... Elles flottent comme des bulles et disparaissent... ... Plus bas encore... au quatrième niveau... Ici règne un silence presque total... Seul le murmure de votre respiration... le battement paisible de votre cœur......",
        
        coreOfPeace: "Vous atteignez maintenant le cœur de la tranquillité... Le cinquième niveau... Ici tout est paix... tout est silence... tout est repos... ... C'est votre sanctuaire intérieur... Votre refuge de sommeil... Rien ne peut vous atteindre ici... Vous êtes en sécurité dans les profondeurs de votre être......",
        
        submersion: "Laissez-vous maintenant submergé par cette paix profonde... Comme si vous vous enfonciez dans un océan de tranquillité... Chaque vague vous porte plus loin du monde éveillé... ... Vous respirez cette paix... elle remplit vos poumons... votre sang... chaque cellule de votre corps... Vous êtes devenu la tranquillité elle-même......",
        
        sleepTransition: "Depuis ces profondeurs... le sommeil vient naturellement... Il monte vers vous comme une marée douce... Vous n'avez pas besoin de le chercher... il vous trouve... ... Abandonnez-vous à cette montée du sommeil... Laissez-le vous emporter... vers les rêves... vers le repos total... vers la régénération......",
        
        closing: "Restez dans ces profondeurs tranquilles... Elles sont votre demeure pour la nuit... Ici vous êtes en sécurité... ici vous pouvez vraiment vous reposer... Dormez dans la paix profonde... et remontez au matin... rafraîchi et renouvelé..."
      },
      {
        name: "Méditation des Vagues Océaniques",
        intro: "Bienvenue dans cette méditation apaisante inspirée de l'océan... Installez-vous confortablement dans votre lit... Fermez les yeux et imaginez que vous êtes allongé sur une belle plage au coucher du soleil... Le son des vagues douces vous guidera vers un sommeil paisible...",
        
        breathing: "Commencez par respirer profondément... Inspirez l'air frais de l'océan... sentez-le remplir complètement vos poumons... Expirez lentement... relâchant toute la tension de votre journée... ... Écoutez le rythme des vagues... Inspirez... et expirez... Inspirez... et expirez... Laissez votre respiration s'harmoniser avec ce rythme naturel... Chaque respiration vous emmène plus profondément dans la relaxation......",
        
        oceanVisualization: "Imaginez-vous allongé sur du sable chaud et doux... Le soleil se couche... peignant le ciel de belles couleurs... Vous pouvez entendre le son doux des vagues qui roulent sur le rivage... Chaque vague emporte vos soucis et votre stress... ... Sentez le sable chaud qui soutient votre corps... La brise douce de l'océan caresse votre peau... Vous êtes complètement en sécurité et en paix ici... ... Avec chaque vague qui roule... vous vous sentez plus somnolent... plus détendu... L'océan vous chante une berceuse......",
        
        bodyRelaxation: "Maintenant laissez les vagues se répandre sur votre corps... En commençant par vos pieds... Sentez-les devenir aussi lourds que du sable mouillé... Les vagues remontent le long de vos jambes... les rendant complètement détendues et lourdes... ... L'eau douce coule sur vos hanches et le bas de votre dos... Toute tension fond comme le sable lissé par la marée... Vos bras flottent paisiblement... lourds et détendus... ... Sentez les vagues se répandre sur votre poitrine... vos épaules... votre cou... Votre visage devient doux et paisible... complètement détendu......",
        
        affirmations: "Avec chaque vague... vous savez... Vous êtes en sécurité et protégé... L'océan vous tient doucement... Vous êtes dans une paix parfaite... ... Votre corps est prêt pour un sommeil profond et réparateur... Les vagues emportent tous vos soucis... Demain apportera de nouvelles possibilités... ... En ce moment... il n'y a que la paix... que le repos... que le son doux des vagues......",
        
        closing: "Continuez à vous reposer ici sur cette plage paisible... Les vagues continuent leur rythme doux... vous berçant vers le sommeil... ... Laissez le son de l'océan vous porter dans de beaux rêves... Dormez profondément... Reposez-vous complètement... Et réveillez-vous rafraîchi comme l'aube sur l'océan... Doux rêves......"
      },
      {
        name: "Relaxation Progressive Françoise",
        intro: "Bienvenue dans cette relaxation musculaire progressive pour le sommeil... Cette pratique vous aidera à relâcher la tension physique et à préparer votre corps pour un repos profond... Trouvez une position confortable et fermez les yeux... Nous allons systématiquement détendre chaque muscle de votre corps...",
        
        breathing: "Commencez par trois respirations profondes et libératrices... Inspirez lentement par le nez... Retenez un moment... Puis expirez complètement par la bouche... relâchant la journée... ... Encore une fois... respirez profondément... sentez votre corps s'expandre... Retenez... et relâchez avec une longue expiration lente... ... Une fois de plus... inspirez la paix... retenez... expirez toute tension... Maintenant laissez votre respiration devenir naturelle et facile......",
        
        progressiveTension: "Nous allons maintenant contracter et relâcher chaque groupe musculaire... Cela aide votre corps à apprendre la différence entre tension et relaxation... D'abord... concentrez-vous sur vos pieds... Contractez vos orteils fortement... Maintenez pendant cinq secondes... un... deux... trois... quatre... cinq...... Maintenant relâchez... Sentez la relaxation inonder vos pieds... ... Ensuite... contractez vos muscles des mollets... Serrez-les fort... Maintenez... un... deux... trois... quatre... cinq...... Et relâchez... Sentez la tension qui fond......",
        
        fullBodyRelease: "Maintenant contractez vos muscles des cuisses... Serrez-les aussi fort que possible... Maintenez pendant cinq... quatre... trois... deux... un... Et relâchez complètement... Sentez le soulagement... ... Serrez vos poings... Maintenez-les serrés... cinq... quatre... trois... deux... un... Relâchez et sentez vos bras devenir lourds et détendus... ... Contractez vos muscles des épaules... Montez-les vers vos oreilles... Maintenez... Et laissez-les tomber... Sentez le relâchement... ... Contractez les muscles de votre visage... Fermez fort vos yeux... Maintenez... Et relâchez complètement... Laissez votre visage devenir doux et paisible......",
        
        bodyIntegration: "Maintenant que chaque muscle de votre corps a été contracté et relâché... Sentez la relaxation profonde dans tout votre corps... Vos pieds sont complètement détendus... Vos jambes sont lourdes et à l'aise... Vos bras sont relâchés et confortables... Votre visage est doux et paisible... ... Remarquez comme la relaxation est différente de la tension... C'est l'état naturel de repos de votre corps... Laissez-vous sombrer plus profondément dans cette sensation paisible......",
        
        affirmations: "Votre corps est maintenant complètement préparé pour le sommeil... Chaque muscle est détendu et à l'aise... Vous avez relâché toute la tension de votre journée... ... Il est sûr de lâcher prise complètement maintenant... Votre corps sait comment se reposer et se réparer... Vous méritez ce sommeil paisible... ... Faites confiance à la sagesse naturelle de votre corps... Permettez-vous de dériver dans un sommeil profond et réparateur......",
        
        closing: "Reposez-vous ici dans cet état de relaxation profonde... Votre corps est lourd et confortable... Votre esprit est calme et silencieux... ... Laissez cette relaxation vous porter dans un sommeil paisible... Dormez profondément... Reposez-vous complètement... Et réveillez-vous en vous sentant rafraîchi et renouvelé... Bonne nuit......"
      }
    ],

    stress: [
      {
        name: "Soulagement du Stress Pleine Conscience",
        intro: "Bienvenue dans cette méditation pour soulager le stress... Trouvez une position assise confortable... votre dos droit mais pas rigide... Placez vos pieds à plat sur le sol... sentez le sol sous vous... Posez vos mains doucement sur vos genoux... Et quand vous êtes prêt... fermez les yeux ou dirigez doucement votre regard vers le bas...",
        
        breathing: "Commençons par prendre quelques respirations profondes et purifiantes... Respirez par le nez... remplissant complètement vos poumons... Et expirez par la bouche... relâchant toute tension... ... Encore une fois... respirez profondément... sentant votre poitrine et votre ventre s'expandre... Et expirez... laissant partir le stress et les inquiétudes... Une fois de plus... respirez de l'énergie fraîche et apaisante... Et expirez tout ce qui ne vous sert plus......",
        
        mindfulness: "Laissez votre attention se poser sur le moment présent... Remarquez la sensation de votre respiration qui entre et sort... Le doux mouvement de montée et descente de votre poitrine... ... Quand des pensées sur votre journée surgissent... et elles le feront... remarquez-les simplement sans jugement... Comme des nuages passant dans le ciel... Laissez-les dériver... ... Ramenez votre attention à votre respiration... C'est votre ancre... Toujours disponible... Toujours présente... ... Il n'y a rien que vous devez résoudre maintenant... Aucun problème à résoudre... Juste cette respiration... puis la suivante......",
        
        closing: "Alors que nous nous préparons à terminer cette méditation... Sachez que cette sensation de calme est toujours disponible pour vous... À seulement quelques respirations... ... Commencez à bouger vos doigts et orteils... Roulez doucement vos épaules... Et quand vous êtes prêt... ouvrez lentement les yeux... ... Prenez un moment pour remarquer comment vous vous sentez... Portez cette paix avec vous alors que vous continuez votre journée... Rappelez-vous... vous pouvez toujours revenir à ce centre calme quand vous en avez besoin... Merci d'avoir pris ce temps pour vous......"
      },
      {
        name: "Libération des Tensions",
        intro: "Bienvenue dans cette pratique de libération des tensions... Le stress s'accumule dans notre corps comme des nœuds... Aujourd'hui nous allons les dénouer un par un... Installez-vous confortablement et préparez-vous à relâcher...",
        
        bodyMapping: "Commençons par cartographier les tensions dans votre corps... Scannez de la tête aux pieds... Où sentez-vous de la rigidité?... Des contractions?... Des zones tendues?... ... Ne jugez pas ce que vous trouvez... notez simplement... Votre corps vous parle... il vous montre où le stress s'est installé......",
        
        breathingRelease: "Maintenant nous allons utiliser le souffle pour libérer... Inspirez profondément... et dirigez ce souffle vers la première zone tendue... ... Imaginez que votre souffle est comme de l'eau chaude... qui dissout la tension... qui aménage l'espace... qui apporte la détente... ... Expirez et laissez partir cette tension... Elle sort avec votre souffle......",
        
        progressiveRelease: "Continuons avec chaque zone tendue... Une par une... Vos épaules... respirez dedans... et relâchez... Votre mâchoire... respirez dedans... et relâchez... ... Votre dos... votre ventre... vos hanches... Chaque respiration libère... chaque expiration dissout... ... Vous sentez votre corps qui s'adoucit... qui retrouve sa fluidité naturelle......",
        
        energyFlow: "Maintenant sentez l'énergie qui circule librement... Là où il y avait des blocages... maintenant il y a du mouvement... de la vie... ... C'est comme si des rivières bloquées se remettaient à couler... Votre énergie vitale peut circuler... vous nourrir... vous revitaliser......",
        
        newBeginning: "Vous vous sentez maintenant différent... plus léger... plus libre... C'est votre nouvel état... sans les tensions habituelles... ... Souvenez-vous de cette sensation... Votre corps peut être détendu... Vous pouvez vivre sans porter le poids du stress......",
        
        closing: "Emportez cette libération avec vous... Quand vous sentez le stress revenir... rappelez-vous cette pratique... Votre corps sait comment se détendre... Vous avez le pouvoir de relâcher... À tout moment... en quelques respirations..."
      },
      {
        name: "Refuge de Calme Intérieur",
        intro: "Bienvenue dans la création de votre refuge intérieur... Un lieu en vous où le stress ne peut pas entrer... où règne une paix permanente... Fermons les yeux et construisons ensemble ce sanctuaire...",
        
        visualization: "Imaginez un lieu qui vous apaise profondément... Peut-être une cabane en montagne... une plage déserte... une forêt silencieuse... Peu importe... l'important c'est que vous vous y sentiez complètement en sécurité... ... Créez ce lieu dans votre esprit... Ajoutez tous les détails qui vous plaisent... les couleurs... les textures... les parfums... C'est VOTRE refuge......",
        
        protection: "Maintenant entourez ce lieu d'une barrière protectrice... Une bulle de lumière dorée... Rien de négatif ne peut traverser cette barrière... Ni stress... ni anxiété... ni peur... ... À l'intérieur de cette bulle... seuls la paix et le calme existent... C'est votre espace sacré... votre refuge personnel......",
        
        dwelling: "Installez-vous dans ce refuge... Sentez la paix qui y règne... Votre respiration devient naturellement plus calme... Votre cœur bat plus doucement... ... Ici vous n'avez rien à faire... rien à prouver... rien à accomplir... Vous pouvez simplement être... dans la paix complète......",
        
        healing: "Ce refuge a des propriétés curatives... Plus vous y restez... plus votre stress se dissout... plus votre énergie se restaure... ... Imaginez que l'air de ce lieu guérit vos blessures émotionnelles... que la terre absorbe vos soucis... que la lumière recharge votre âme......",
        
        memorization: "Maintenant mémorisez ce lieu... Chaque détail... chaque sensation... Créez un signal... peut-être un mot... un geste... qui vous ramènera instantanément ici... ... Ce refuge existe maintenant en vous... Il est toujours accessible... peu importe où vous êtes... peu importe ce qui se passe......",
        
        closing: "Quand vous quittez ce refuge... sachez que vous pouvez y retourner à tout moment... Il est à vous pour toujours... Votre havre de paix... votre antidote au stress... Portez sa sérénité avec vous dans le monde..."
      },
      {
        name: "Méditation du Lâcher-Prise",
        intro: "Bienvenue dans cette méditation du lâcher-prise... Parfois le stress vient de notre tentative de tout contrôler... Aujourd'hui nous allons apprendre l'art de lâcher prise... de faire confiance... de nous détendre dans le flux de la vie...",
        
        breathing: "Commençons par quelques respirations qui vous ancrent dans le moment présent... Inspirez profondément... sentez votre corps qui se pose... Expirez complètement... laissez partir les tensions... ... Avec chaque respiration... vous vous abandonnez un peu plus... vous relâchez un peu plus la résistance... Vous vous laissez porter par le souffle......",
        
        recognizeControl: "Prenez un moment pour identifier ce que vous essayez de contrôler aujourd'hui... Peut-être une situation... une personne... un résultat... Reconnaissez cette tendance sans jugement... C'est humain de vouloir contrôler... ... Maintenant imaginez tenir ces préoccupations comme des objets dans vos mains... Sentez leur poids... leur résistance... Comme c'est fatigant de les porter......",
        
        lettingGo: "Maintenant... une par une... ouvrez vos mains... Laissez ces préoccupations s'envoler... Comme des oiseaux qui retrouvent leur liberté... Comme des ballons qui montent vers le ciel... ... Vous n'abandonnez pas... vous faites confiance... Vous permettez à la vie de vous porter... de vous surprendre... de vous soutenir......",
        
        trust: "Dans ce lâcher-prise... découvrez la confiance... Confiance en la vie qui vous porte... Confiance en votre capacité d'adaptation... Confiance en votre résilience... ... Vous n'avez pas besoin de tout contrôler pour être en sécurité... La vie veut votre bien... Elle conspire pour vous... Laissez-la vous montrer le chemin......",
        
        freedom: "Sentez la liberté qui vient du lâcher-prise... Vos épaules se détendent... Votre respiration s'approfondit... Votre cœur s'ouvre... C'est cela... vivre sans résistance... ... Vous restez responsable de vos actions... mais vous lâchez l'attachement aux résultats... Vous faites de votre mieux... et vous laissez la vie faire le reste......",
        
        closing: "Alors que nous terminons... emportez cette sagesse avec vous... Le lâcher-prise n'est pas de l'abandon... c'est de la confiance... ... Quand le stress revient... rappelez-vous... vous pouvez lâcher prise... vous pouvez faire confiance... vous pouvez vous détendre dans le courant de la vie... Vous êtes porté... vous êtes soutenu... vous êtes libre..."
      },
      {
        name: "Respiration Anti-Stress 4-7-8",
        intro: "Bienvenue dans cette technique de respiration anti-stress... La respiration 4-7-8 est un outil puissant pour calmer instantanément votre système nerveux... Cette pratique ancestrale peut transformer votre état en quelques minutes seulement...",
        
        preparation: "Installez-vous confortablement... Placez le bout de votre langue contre l'arrière de vos dents du haut... Vous allez respirer par la bouche autour de votre langue... Cela peut sembler étrange au début... mais c'est normal... ... Prenez d'abord quelques respirations normales pour vous détendre... Laissez votre corps s'installer... Préparez-vous à activer votre réponse de relaxation......",
        
        technique: "Maintenant commençons le cycle 4-7-8... Expirez complètement par la bouche avec un son 'whoosh'... Fermez la bouche et inspirez silencieusement par le nez en comptant jusqu'à 4... un... deux... trois... quatre... ... Retenez votre souffle en comptant jusqu'à 7... un... deux... trois... quatre... cinq... six... sept... ... Expirez complètement par la bouche avec un 'whoosh' en comptant jusqu'à 8... un... deux... trois... quatre... cinq... six... sept... huit......",
        
        continuation: "C'est un cycle complet... Recommençons... Inspirez par le nez pour 4... un... deux... trois... quatre... Retenez pour 7... un... deux... trois... quatre... cinq... six... sept... Expirez par la bouche pour 8... un... deux... trois... quatre... cinq... six... sept... huit... ... Encore une fois... Gardez le rythme... 4... 7... 8... Sentez votre système nerveux qui se calme... votre stress qui diminue......",
        
        effects: "Continuez ce cycle... Remarquez comment votre corps répond... Votre rythme cardiaque ralentit... Vos muscles se détendent... Votre esprit s'apaise... ... Cette respiration envoie un message direct à votre cerveau... 'Je suis en sécurité... Je peux me détendre'... Votre système nerveux parasympathique s'active... l'antidote naturel au stress......",
        
        integration: "Faisons encore quelques cycles... Respirez à votre rythme... Si vous vous sentez légèrement étourdi... c'est normal... Ralentissez simplement... ... Cette technique est toujours disponible... Dans un embouteillage... avant un examen... dans une situation stressante... Quatre respirations suffisent pour changer votre état......",
        
        closing: "Laissez maintenant votre respiration revenir à la normale... Prenez un moment pour observer les changements dans votre corps... dans votre esprit... ... Vous venez d'apprendre un outil puissant... Utilisez-le chaque fois que le stress apparaît... 4-7-8... Votre chemin vers la paix instantanée... Vous êtes maintenant équipé pour gérer le stress... avec chaque respiration..."
      }
    ],

    focus: [
      {
        name: "Concentration avec Ancre Respiratoire",
        intro: "Bienvenue dans cette méditation de concentration et de focus... Asseyez-vous confortablement avec votre colonne vertébrale droite et alerte... Posez vos mains sur vos genoux ou dans votre giron... Prenez un moment pour établir une intention de clarté et de focus... Quand vous êtes prêt... fermez doucement les yeux...",
        
        breathing: "Commencez par prendre trois respirations profondes et énergisantes... Respirez par le nez... remplissant vos poumons d'air frais... Et expirez complètement par la bouche... ... Encore une fois... inhalez profondément... vous sentant alerte et éveillé... Expirez complètement... relâchant tout brouillard mental... Une fois de plus... respirez la clarté... expirez la distraction... ... Maintenant, laissez votre respiration revenir à la normale... mais gardez votre attention sur chaque respiration......",
        
        affirmations: "Répétez mentalement ces affirmations pour la concentration... 'Mon esprit est clair et vif'... ... 'Je suis complètement présent et conscient'... ... 'Ma concentration est forte et stable'... ... 'Je me concentre avec facilité et clarté'... ... Laissez ces mots s'enfoncer profondément dans votre conscience......",
        
        closing: "Alors que nous terminons cette méditation... Sentez la clarté améliorée dans votre esprit... Votre capacité améliorée à vous concentrer... ... Commencez à approfondir votre respiration... Bougez vos doigts et orteils... Et quand vous êtes prêt... ouvrez les yeux... ... Remarquez à quel point vous vous sentez alerte et concentré... Votre esprit est clair... vif et prêt... Portez cette attention focalisée dans votre prochaine activité... Vous êtes préparé à travailler avec précision et clarté......"
      },
      {
        name: "Laser Focus - Concentration Intense",
        intro: "Bienvenue dans cette méditation pour développer un focus laser... Cette pratique va affûter votre concentration comme on aiguise une lame... Installez-vous dans une position alerte et stable... Préparez-vous à entraîner votre mental comme un athlète entraîne son corps...",
        
        mentalPreparation: "Commençons par préparer votre mental... Imaginez votre esprit comme un faisceau lumineux... Actuellement ce faisceau est peut-être dispersé... étalé dans toutes les directions... ... Maintenant visualisez ce faisceau qui se concentre... qui devient plus étroit... plus précis... plus puissant... C'est votre attention qui se focalise......",
        
        breathingFocus: "Utilisons la respiration comme notre cible de concentration... Portez toute votre attention sur la sensation de l'air qui entre par vos narines... ... Quand votre mental vagabonde... et il le fera... ramenez-le fermement mais gentiment à cette sensation... C'est l'entraînement... c'est ainsi que se développe la concentration... ... Chaque retour à la respiration renforce votre muscle de l'attention......",
        
        singlePointed: "Maintenant affinons encore plus votre focus... Concentrez-vous sur un seul point... Peut-être la pointe de votre nez... ou l'espace entre vos sourcils... ... Toute votre conscience converge vers ce point unique... Comme un laser... précis... concentré... puissant... ... Si des pensées apparaissent... reconnaissez-les et redirigez immédiatement votre attention vers ce point......",
        
        mentalClarity: "Sentez la clarté qui émerge de cette concentration... Votre esprit devient comme un ciel sans nuages... transparent... limpide... éveillé... ... Cette clarté est votre état naturel quand l'attention n'est pas dispersée... C'est votre potentiel mental optimal... Mémorisez cette sensation......",
        
        integration: "Maintenant élargissez doucement votre focus... Gardez cette qualité de concentration mais incluez votre environnement... ... Vous pouvez maintenir cette attention concentrée tout en étant ouvert... C'est l'art de la concentration appliquée... concentré mais flexible......",
        
        closing: "Ouvrez maintenant les yeux avec cette nouvelle acuité mentale... Votre attention est affûtée... votre concentration renforcée... ... Testez cette nouvelle capacité... Regardez un objet et voyez comme vous pouvez le percevoir avec précision... ... Emportez ce focus laser dans vos activités... Votre mental est maintenant un outil de précision... Utilisez-le avec intention et maîtrise..."
      }
    ],

    anxiety: [
      {
        name: "Soulagement de l'Anxiété par l'Ancrage",
        intro: "Bienvenue dans cette méditation pour soulager l'anxiété... Trouvez une position confortable où vous vous sentez soutenu et en sécurité... Vous pouvez placer une main sur votre cœur et une sur votre ventre... Cela vous aide à vous sentir ancré et connecté à vous-même... Prenez un moment pour arriver complètement ici...",
        
        grounding: "Commençons par nous ancrer dans le moment présent... Sentez vos pieds sur le sol... ou votre corps dans la chaise... Remarquez cinq choses que vous pouvez sentir maintenant... La température de l'air... La texture de vos vêtements... Le poids de votre corps... ... C'est réel... C'est maintenant... Vous êtes en sécurité dans ce moment......",
        
        affirmations: "Offrons-nous quelques affirmations apaisantes... 'Je suis en sécurité dans ce moment'... ... 'Ce sentiment passera'... ... 'J'ai survécu à l'anxiété avant et je la survivrai encore'... ... 'Je suis plus fort que mon anxiété'... ... 'La paix est mon état naturel'... ... 'Je choisis le calme'......",
        
        closing: "Alors que nous terminons cette méditation... Rappelez-vous que vous avez toujours ces outils disponibles... Votre respiration... Votre lieu sûr... Votre force intérieure... ... Commencez à bouger doucement votre corps... Peut-être vous étirer un peu... Prenez une respiration profonde et ouvrez lentement les yeux... ... Remarquez tout changement dans ce que vous ressentez... Même un petit changement est significatif... Soyez doux avec vous-même alors que vous retournez à votre journée... Vous êtes courageux... Vous êtes capable... Et vous n'êtes pas seul......"
      }
    ],

    energy: [
      {
        name: "Énergie du Soleil Doré",
        intro: "Bienvenue dans cette méditation énergisante... Asseyez-vous ou tenez-vous dans une position qui se sent forte et alerte... Imaginez une corde vous tirant vers le haut depuis le sommet de votre tête... Sentez votre colonne vertébrale s'allonger... votre poitrine s'ouvrir... Vous êtes sur le point d'éveiller votre vitalité naturelle...",
        
        breathing: "Commençons par quelques respirations énergisantes... Prenez une respiration profonde par le nez... remplissant tout votre corps d'énergie fraîche... Et expirez vigoureusement par la bouche avec un son 'HA'... relâchant toute fatigue... ... Encore une fois... respirez vitalité et force vitale... Et expirez 'HA'... laissant partir la paresse... Une fois de plus... inhalez puissance et énergie... Expirez 'HA'... vous sentant plus éveillé......",
        
        affirmations: "Activons votre énergie avec des affirmations puissantes... 'Je suis rempli d'énergie vibrante'... ... 'Mon corps est fort et vivant'... ... 'J'ai toute l'énergie dont j'ai besoin pour ma journée'... ... 'Je suis motivé et prêt à l'action'... ... 'L'énergie coule librement à travers moi'... ... Sentez ces mots charger chaque cellule de votre corps......",
        
        closing: "Alors que nous terminons cette méditation énergisante... Sentez la vitalité couler dans vos veines... Vous êtes éveillé... alerte et complètement chargé... ... Commencez à bouger votre corps comme cela vous fait du bien... Peut-être étirer vos bras au-dessus de votre tête... Rouler votre cou... Rebondir doucement sur vos orteils... ... Quand vous êtes prêt... ouvrez grand les yeux... Prenez le monde avec une énergie fraîche... Vous êtes prêt à embrasser votre journée avec enthousiasme et puissance... Allez-y et laissez briller votre lumière......"
      }
    ],

    mindfulness: [
      {
        name: "Conscience du Moment Présent",
        intro: "Bienvenue dans cette méditation de pleine conscience... Trouvez une position confortable où vous pouvez vous asseoir avec vigilance et aisance... Cette pratique consiste à cultiver la conscience du moment présent... Il n'y a nulle part où aller et rien à accomplir... être simplement ici maintenant...",
        
        breathing: "Commençons par nous ancrer dans la respiration... Remarquez votre rythme respiratoire naturel... ne le changez pas... observez simplement... ... Sentez l'air entrer par vos narines... la légère pause... et la douce libération... ... Votre respiration se déroule toujours dans le moment présent... Utilisez-la comme votre ancre vers l'ici et maintenant... Quand votre esprit vagabonde... revenez simplement à la respiration... sans jugement... juste un retour doux......",
        
        bodyAwareness: "Maintenant élargissez votre conscience pour inclure votre corps... Remarquez comment vous êtes assis... Sentez les points de contact où votre corps rencontre la surface... ... Parcourez votre corps avec une curiosité douce... Quelles sensations sont présentes maintenant?... Peut-être de la chaleur... de la fraîcheur... de la tension... de la détente... ... Remarquez simplement ce qui est là... sans essayer de rien changer... Votre corps est une porte d'entrée vers la présence......",
        
        thoughtAwareness: "Alors que nous continuons... remarquez toute pensée qui surgit... Plutôt que de vous laisser prendre dans l'histoire... voyez si vous pouvez observer les pensées comme des nuages passant dans le ciel de votre esprit... ... Certaines pensées sont légères et vaporeuses... d'autres peuvent être de lourds nuages d'orage... Toutes sont bienvenues... toutes passeront... ... Vous n'êtes pas vos pensées... vous êtes l'espace conscient dans lequel les pensées apparaissent et disparaissent......",
        
        presentMoment: "En ce moment même... dans ce moment précis... tout est exactement comme il est... Il y a une paix profonde dans l'acceptation de ce qui est là... sans résistance... ... Écoutez les sons autour de vous... remarquez qu'ils surgissent frais à chaque moment... ... Sentez la vivacité dans votre corps... l'énergie d'être ici... maintenant... ... Ce moment est le seul moment qui existe jamais... et il se renouvelle constamment......",
        
        affirmations: "Laissez ces mots s'installer dans votre conscience... 'Je suis présent'... ... 'Je suis ici maintenant'... ... 'Ce moment suffit'... ... 'Je suis conscient et éveillé'... ... 'La paix se trouve dans la présence'...",
        
        closing: "Alors que nous concluons cette pratique... prenez un moment pour apprécier que vous vous êtes offert le cadeau de la présence... ... Remarquez comment vous vous sentez après avoir passé du temps dans la conscience attentive... ... Quand vous êtes prêt... ouvrez lentement les yeux s'ils étaient fermés... ... Voyez si vous pouvez porter cette qualité de présence avec vous... dans votre prochaine activité... et tout au long de votre journée... Le moment présent est toujours disponible... toujours en attente de votre retour......"
      }
    ],

    compassion: [
      {
        name: "Pratique de Bienveillance Aimante",
        intro: "Bienvenue dans cette méditation de compassion... Installez-vous dans une position confortable et placez une main sur votre cœur... Nous allons cultiver la bienveillance... d'abord pour vous-même... puis l'étendre vers les autres... C'est une pratique d'ouverture du cœur...",
        
        selfCompassion: "Commencez par vous amener à l'esprit... Imaginez-vous tel que vous êtes maintenant... Voyez-vous avec des yeux bienveillants... comme vous regarderiez un ami cher... ... Offrez-vous silencieusement ces mots de bienveillance... 'Que je sois heureux... Que je sois en bonne santé... Que je sois en paix... Que je vive avec aisance...' ... Sentez ces souhaits dans votre cœur... Remarquez toute résistance... et soyez doux avec cela aussi... Vous méritez l'amour... surtout de vous-même......",
        
        lovedOne: "Maintenant amenez à l'esprit quelqu'un que vous aimez facilement... un membre de la famille... un ami proche... un animal de compagnie bien-aimé... Voyez leur visage... sentez votre affection naturelle pour eux... ... Étendez les mêmes souhaits aimants... 'Que tu sois heureux... Que tu sois en bonne santé... Que tu sois en paix... Que tu vives avec aisance...' ... Sentez la chaleur dans votre cœur alors que vous leur envoyez de l'amour... Remarquez comme il est bon de souhaiter du bien à quelqu'un......",
        
        neutral: "Maintenant pensez à quelqu'un de neutre... peut-être un caissier que vous voyez régulièrement... un voisin que vous connaissez à peine... quelqu'un ni ami ni ennemi... ... Pratiquez l'extension de la même bienveillance... 'Que tu sois heureux... Que tu sois en bonne santé... Que tu sois en paix... Que tu vives avec aisance...' ... Cette personne veut être heureuse comme vous... Elle fait face aux luttes comme vous... Voyez si vous pouvez vous connecter à votre humanité partagée......",
        
        difficult: "Si vous vous sentez prêt... amenez à l'esprit quelqu'un avec qui vous avez des difficultés... Commencez par quelqu'un légèrement défiant... pas la personne la plus difficile de votre vie... ... Cela peut sembler difficile... allez lentement... 'Que tu sois heureux... Que tu sois en bonne santé... Que tu sois en paix... Que tu vives avec aisance...' ... Souvenez-vous... leur bonheur n'enlève rien au vôtre... Les personnes blessées blessent souvent les autres... Pouvez-vous trouver de la compassion pour leur douleur?......",
        
        universal: "Enfin... élargissez votre conscience pour inclure tous les êtres partout... Voyez la terre depuis l'espace... toutes les créatures... tous les humains... luttant et cherchant le bonheur... ... Avec un cœur ouvert... offrez cette bienveillance universelle... 'Que tous les êtres soient heureux... Que tous les êtres soient en bonne santé... Que tous les êtres soient en paix... Que tous les êtres vivent avec aisance...' ... Sentez-vous comme faisant partie de ce vaste réseau de connexion... donnant et recevant de l'amour......",
        
        closing: "Reposez votre main sur votre cœur une fois de plus... Sentez la chaleur là... l'amour que vous avez généré... Cette bienveillance vit en vous toujours... ... Souvenez-vous... la vraie compassion vous inclut... Soyez doux avec vous-même alors que vous traversez votre journée... ... Quand vous rencontrez les autres... voyez si vous pouvez vous souvenir de cette connexion du cœur... Chacun fait de son mieux avec ce qu'il a... Chacun mérite l'amour... en commençant par vous......"
      }
    ],

    walking: [
      {
        name: "Pratique de Marche Consciente",
        intro: "Bienvenue dans cette méditation de marche... Vous pouvez faire cette pratique n'importe où... à l'intérieur dans un espace calme... ou dehors dans la nature... Commencez par vous tenir immobile... sentant vos pieds sur le sol... Nous allons transformer la marche en méditation...",
        
        preparation: "Commencez par vous tenir debout avec vos pieds écartés à la largeur des hanches... Sentez le contact entre vos pieds et la terre... Remarquez votre posture... colonne vertébrale droite mais pas rigide... épaules détendues... bras pendants naturellement à vos côtés... ... Prenez quelques respirations profondes... arrivant pleinement dans votre corps... dans ce moment... Fixez l'intention de marcher avec conscience... chaque pas une méditation......",
        
        firstSteps: "Commencez à lever votre pied droit lentement... Remarquez le transfert de poids vers votre pied gauche... Sentez le soulèvement... le mouvement... la pose de votre pied... ... Prenez chaque pas délibérément... environ la moitié de votre vitesse de marche normale... Il n'y a pas de destination... pas de hâte... juste l'acte simple de marcher... ... Remarquez comment votre corps s'équilibre naturellement... se coordonne... se déplace dans l'espace... Émerveillez-vous de ce miracle quotidien......",
        
        breathAndSteps: "Maintenant coordonnez votre respiration avec vos pas... Peut-être deux pas sur l'inspiration... deux pas sur l'expiration... Trouvez un rythme qui semble naturel... ... Si votre esprit vagabonde vers votre destination ou votre liste de tâches... ramenez doucement l'attention à la sensation physique de marcher... La sensation de vos pieds touchant le sol... se soulevant... avançant......",
        
        awareness: "Élargissez votre conscience pour inclure votre environnement... Si vous êtes dehors... remarquez la température de l'air... toute brise... les sons de la nature... les oiseaux... les feuilles qui bruissent... ... Si vous êtes à l'intérieur... soyez conscient de l'espace autour de vous... l'éclairage... la qualité de l'air... ... Restez connecté à la sensation de marcher tout en absorbant votre environnement... Marcher comme une danse entre la conscience intérieure et la présence extérieure......",
        
        gratitude: "Alors que vous continuez à marcher... apportez de l'appréciation à ce corps incroyable... Vos jambes qui vous portent... vos pieds qui vous soutiennent... votre équilibre qui vous garde stable... ... Sentez la gratitude pour votre capacité à vous déplacer dans le monde... Tout le monde n'a pas ce don... Chaque pas est un privilège... ... Remarquez comment la méditation de marche crée un sanctuaire en mouvement... la paix en mouvement......",
        
        closing: "Alors que nous terminons cette pratique de marche... revenez à la position debout... sentez vos pieds fermement sur le sol... ... Prenez un moment pour apprécier cette pratique simple mais profonde... Vous pouvez apporter cette conscience à toute marche... transformer des pas ordinaires en moments de méditation... ... Portez cette présence consciente avec vous... dans votre prochaine activité... Chaque pas peut être un retour au moment présent......"
      }
    ],

    breathing: [
      {
        name: "Pratique de Respiration Complète",
        intro: "Bienvenue dans cette méditation de respiration... Trouvez une position confortable où votre colonne vertébrale peut être droite... Placez une main sur votre poitrine et une sur votre ventre... Nous allons explorer la respiration complète et consciente...",
        
        naturalBreath: "Commencez par observer votre respiration naturelle... sans la changer... juste la remarquer... ... Sentez le mouvement sous vos mains... Quelle main bouge le plus?... La plupart des gens respirent principalement avec la poitrine... mais nous allons apprendre à respirer avec tout le corps......",
        
        deepBreathing: "Maintenant commençons à approfondir doucement la respiration... Respirez lentement par le nez... permettant à l'air de remplir d'abord votre ventre... ... Sentez votre main sur le ventre se lever... votre diaphragme s'étendre... ... Continuez à remplir votre poitrine... sentez votre main sur la poitrine se lever... côtes s'expandant... ... Faites une pause douce au sommet de l'inspiration... tenant toute cette vitalité... ... Maintenant expirez lentement... permettant à l'air de sortir doucement de votre poitrine... puis de votre ventre... ... Sentez votre corps se détendre à chaque expiration......",
        
        breathCounting: "Trouvons maintenant un rythme... Inspirez pour quatre temps... un... deux... trois... quatre... ... Faites une pause douce pour deux temps... un... deux... ... Expirez pour six temps... un... deux... trois... quatre... cinq... six... ... Cette expiration plus longue active la réponse de relaxation de votre corps... ... Continuez ce rythme... 4 temps inspiration... 2 temps pause... 6 temps expiration... Trouvez votre propre rythme confortable......",
        
        breathAwareness: "Alors que vous continuez cette respiration rythmée... remarquez les sensations subtiles... L'air frais entrant... l'air chaud sortant... ... La pause naturelle entre l'inspiration et l'expiration... l'immobilité... la paix... ... Sentez comment cette respiration consciente calme votre système nerveux... apaise votre esprit... détend votre corps... ... Chaque respiration est un don... une occasion de revenir au présent......",
        
        affirmations: "Avec chaque inspiration... respirez ces qualités... 'J'inspire la paix'... ... 'J'inspire la clarté'... ... 'J'inspire la vitalité'... ... Avec chaque expiration... relâchez... 'J'expire la tension'... ... 'J'expire les inquiétudes'... ... 'J'expire tout ce qui ne me sert plus'...",
        
        closing: "Alors que nous terminons cette pratique de respiration... laissez votre respiration revenir à la normale... mais gardez cette conscience du souffle... ... Remarquez comment vous vous sentez... plus calme... plus centré... plus vivant... ... Souvenez-vous... votre respiration est toujours avec vous... un outil constant pour la paix et la présence... ... Chaque fois que vous vous sentez stressé ou distrait... vous pouvez revenir à cette respiration consciente... Votre souffle est votre maison......"
      }
    ],

    morning: [
      {
        name: "Pratique d'Éveil de l'Aube",
        intro: "Bienvenue dans cette méditation matinale... Alors que vous commencez votre journée... prenez ce temps pour vous réveiller en douceur... pas seulement votre corps... mais votre esprit et votre cœur aussi... Chaque matin est une renaissance... une chance de commencer frais...",
        
        awakening: "Commencez par étirer doucement votre corps... Levez vos bras au-dessus de votre tête... étirez-vous comme un chat au soleil... ... Bâillez si vous en avez envie... Laissez votre corps se réveiller naturellement... ... Prenez quelques respirations profondes... sentant l'air frais du matin remplir vos poumons... ... Votre corps a eu toute la nuit pour se reposer et se réparer... Maintenant il est temps de vous réveiller avec intention......",
        
        breathing: "Établissons un rythme respiratoire énergisant... Inspirez par le nez pour quatre temps... vous sentant alerte et vivant... ... Expirez par la bouche pour quatre temps... relâchant toute somnolence... ... Encore une fois... inspirez vitalité et énergie... expirez fatigue et brouillard... ... Sentez votre corps se réveiller avec chaque respiration... votre esprit devenant plus clair... plus concentré......",
        
        intention: "Maintenant fixons une intention pour cette journée... Qu'aimeriez-vous créer aujourd'hui?... Comment voulez-vous vous sentir?... ... Peut-être votre intention est 'Je veux être présent'... ou 'Je veux être bienveillant'... ou 'Je veux être courageux'... ... Choisissez une intention qui résonne avec votre cœur... Sentez-la s'installer dans votre être... ... Cette intention sera votre étoile guide tout au long de la journée......",
        
        gratitude: "Prenons un moment pour la gratitude matinale... Pensez à trois choses pour lesquelles vous êtes reconnaissant... ... Peut-être pour ce nouveau jour... pour votre santé... pour les personnes que vous aimez... pour les opportunités que vous avez... ... Sentez cette gratitude s'étendre dans votre poitrine... vous remplissant de chaleur... ... La gratitude est comme le soleil... elle illumine tout ce qu'elle touche... ... Laissez cette appréciation remplir chaque cellule de votre corps... vous préparant à voir la beauté dans la journée qui vous attend......",
        
        affirmations: "Remplissons votre esprit d'affirmations positives pour le matin... 'J'accueille ce nouveau jour avec joie'... ... 'J'ai tout ce dont j'ai besoin en moi'... ... 'Cette journée est pleine de possibilités'... ... 'Je suis prêt à embrasser ce qui vient'... ... 'Je rayonne de paix et de positivité'... ... Sentez ces mots s'ancrer profondément dans votre conscience......",
        
        closing: "Alors que nous terminons cette méditation matinale... prenez un moment pour apprécier ce cadeau que vous vous êtes offert... ... Sentez-vous prêt et énergisé pour votre journée... centré dans votre intention... rempli de gratitude... ... Quand vous vous lèverez... portez cette énergie consciente avec vous... ... Souvenez-vous... chaque matin est une nouvelle chance... une page blanche... Que ferez-vous de cette belle journée?... ... Levez-vous... brillez... et laissez votre lumière toucher le monde......"
      }
    ]
  },

  // German meditation templates
  de: {
    sleep: [
      {
        name: "Körperreise zum Einschlafen",
        intro: "Willkommen zu dieser friedlichen Einschlafmeditation... Finde eine bequeme Position in deinem Bett... lass deinen Körper tief in die Matratze sinken... Schließe sanft die Augen und beginne deinen Atem zu bemerken... Du musst jetzt nichts tun... außer entspannen und meiner Stimme zu lauschen...",
        
        breathing: "Beginnen wir mit einigen beruhigenden Atemzügen... Atme langsam durch die Nase ein... zähle bis fünf... eins... zwei... drei... vier... fünf... Halte den Atem sanft an... eins... zwei... drei... vier... fünf... Und nun langsam durch den Mund ausatmen... eins... zwei... drei... vier... fünf... Lass deine Atmung zu ihrem natürlichen Rhythmus zurückkehren... du fühlst dich entspannter mit jedem Atemzug......",
        
        bodyRelaxation: "Nun machen wir eine sanfte Körperreise um alle Anspannungen loszulassen... Beginne mit deiner Aufmerksamkeit bei den Füßen... Spüre wie sie schwer und warm werden... Lass diese Schwere durch deine Knöchel aufsteigen... deine Waden... deine Knie... Spüre wie deine Beine tiefer ins Bett sinken... ... Bringe nun deine Aufmerksamkeit zu deinen Hüften und dem unteren Rücken... Lass sie weich werden und loslassen... Spüre wie dein Bauch mit jedem Atemzug auf und ab geht... Deine Brust dehnt sich sanft aus... ... Bringe dein Bewusstsein zu deinen Schultern... Lass sie von den Ohren wegfallen... Spüre das Gewicht deiner Arme... schwer und entspannt... Deine Hände ruhen friedlich... ... Bemerke deinen Nacken... Lass ihn länger werden und weicher... Dein Kiefer entspannt sich... Dein Gesicht wird ruhig... Selbst die kleinen Muskeln um deine Augen lassen los......",
        
        visualization: "Stelle dir einen friedlichen Ort vor... Vielleicht liegst du auf einer weichen Wolke... schwebst sanft durch einen Sternenhimmel... Oder du ruhst in einem wunderschönen Garten... umgeben vom sanften Duft von Lavendel... Die Luft hat die perfekte Temperatur... Du fühlst dich vollkommen sicher und beschützt... ... Mit jedem Atemzug treibst du tiefer in die Entspannung... Dein Geist wird still und ruhig... wie ein ruhiger See der den Mond widerspiegelt... Gedanken die aufkommen treiben einfach vorbei wie Wolken... Du musst an nichts festhalten......",
        
        affirmations: "Während du hier in vollkommenem Frieden ruhst... wisse dass... Du bist sicher... Du bist warm... Du bist beschützt... Du bist geliebt... ... Dein Körper weiß wie er schlafen soll... Es ist sicher jetzt loszulassen... Du verdienst diese Ruhe... Morgen wird für sich sorgen... ... In diesem Moment... in diesem Jetzt... ist alles genau so wie es sein sollte......",
        
        closing: "Bleibe weiterhin in diesem friedlichen Zustand... Dein Körper ist schwer und entspannt... Dein Geist ist ruhig und still... Mit jedem Atemzug sinkst du tiefer in erholsamen Schlaf... ... Ich lasse dich nun in friedliche Träume gleiten... Schlaf gut... Ruhe tief... Und erwache erfrischt wenn es Zeit ist... Süße Träume......"
      },
      
      {
        name: "Atemmeditation zum Einschlafen",
        intro: "Willkommen zu dieser Atemmeditation zum Einschlafen... Mache es dir in deinem Bett bequem... schließe die Augen und spüre die Ruhe des Abends... Dein Atem wird dich sanft in den Schlaf führen...",
        
        breathing: "Beginne damit einfach deinen natürlichen Atem zu beobachten... Spüre wie die Luft durch deine Nase einströmt... kühl beim Einatmen... warm beim Ausatmen... ... Atme nun etwas tiefer... durch die Nase ein... und durch den Mund aus... Lass jeden Ausatem die Anspannung des Tages fortragen... ... Einatmen... Ruhe und Frieden... Ausatmen... Stress und Sorgen... ... Finde deinen eigenen Rhythmus... Ein... und aus... Ein... und aus... Jeder Atemzug bringt dich dem Schlaf näher......",
        
        bodyAwareness: "Während du weiter atmest... spüre deinen Körper im Bett... Dein Kopf sinkt ins Kissen... Deine Schultern werden schwer... Deine Arme ruhen entspannt... ... Dein Rücken wird vom Bett getragen... Deine Hüften sinken ein... Deine Beine werden schwer wie Blei... Deine Füße sind völlig entspannt... ... Mit jedem Atemzug wirst du schwerer... entspannter... müder... Dein ganzer Körper bereitet sich auf den Schlaf vor......",
        
        countingBreath: "Nun zählen wir die Atemzüge... Einatmen... eins... Ausatmen... zwei... Einatmen... drei... Ausatmen... vier... ... Zähle weiter bis zehn... dann beginne wieder bei eins... Wenn du die Zahl verlierst... kein Problem... beginne einfach wieder bei eins... ... Diese Zählung hilft dem Geist zur Ruhe zu kommen... Eins... zwei... drei... vier... der Schlaf kommt näher......",
        
        closing: "Lass das Zählen nun los... Atme einfach natürlich... Spüre wie müde und schwer dein Körper geworden ist... Dein Geist ist ruhig und friedlich... ... Du bist bereit für einen tiefen... erholsamen Schlaf... Schlafe nun ein... lass los... und träume süß... Gute Nacht......"
      }
    ],

    stress: [
      {
        name: "Achtsamkeit gegen Stress",
        intro: "Willkommen zu dieser Achtsamkeitsmeditation gegen Stress... Setze dich bequem hin... dein Rücken aufrecht aber nicht steif... Stelle deine Füße flach auf den Boden... spüre den Boden unter dir... Lege deine Hände sanft auf die Oberschenkel... Wenn du bereit bist... schließe die Augen oder senke den Blick sanft nach unten...",
        
        breathing: "Beginnen wir mit einigen tiefen reinigenden Atemzügen... Atme durch die Nase ein... fülle deine Lungen vollständig... Und atme durch den Mund aus... lass alle Anspannung los... ... Noch einmal... atme tief ein... spüre wie sich Brust und Bauch weiten... Und atme aus... lass Stress und Sorgen los... Ein letztes Mal... atme frische beruhigende Energie ein... Und atme alles aus was dir nicht mehr dient......",
        
        bodyAwareness: "Bringe nun deine Aufmerksamkeit zu deinem Körper... Bemerke Bereiche wo du Spannung hältst... Vielleicht in den Schultern... dem Kiefer... dem Bauch... ... Ohne etwas zu verändern... nimm diese Empfindungen einfach wahr... Erkenne sie mit Freundlichkeit an... ... Stelle dir nun vor du atmest in diese verspannten Bereiche... Mit jedem Einatmen sendest du Atem und Raum zur Spannung... Mit jedem Ausatmen spürst du wie die Steifheit weicher wird... ... Setze diese sanfte Atmung fort... ein... Raum schaffen... aus... Spannung loslassen......",
        
        mindfulness: "Lass deine Aufmerksamkeit im gegenwärtigen Moment ruhen... Bemerke das Gefühl deines Atems der ein und aus geht... Das sanfte Heben und Senken deiner Brust... ... Wenn Gedanken über deinen Tag aufkommen... und das werden sie... bemerke sie einfach ohne zu urteilen... Wie Wolken die am Himmel vorbeiziehen... Lass sie vorbeidriften... ... Kehre zu deinem Atem zurück... Das ist dein Anker... Immer verfügbar... Immer gegenwärtig... ... Es gibt nichts was du jetzt herausfinden musst... Keine Probleme zu lösen... Nur dieser Atemzug... dann der nächste......",
        
        visualization: "Stelle dir ein warmes goldenes Licht über deinem Kopf vor... Das ist das Licht des Friedens und der Ruhe... Mit jedem Atemzug fließt dieses Licht durch deinen Körper nach unten... ... Es fließt durch deinen Kopf... löst mentale Anspannung... Hinunter durch Nacken und Schultern... schmilzt Stress weg... Durch deine Brust... beruhigt dein Herz... Hinunter durch deine Arme zu den Fingerspitzen... ... Das goldene Licht setzt sich durch deinen Bauch fort... beruhigt jede Angst... Hinunter durch Hüften und Beine... erdet dich... Bis zu deinen Zehen... ... Du bist nun erfüllt von diesem friedlichen goldenen Licht......",
        
        closing: "Während wir uns darauf vorbereiten diese Meditation zu beenden... Wisse dass dieses Gefühl der Ruhe immer für dich verfügbar ist... Nur wenige Atemzüge entfernt... ... Beginne deine Finger und Zehen zu bewegen... Rolle deine Schultern sanft... Und wenn du bereit bist... öffne langsam die Augen... ... Nimm dir einen Moment um zu bemerken wie du dich fühlst... Nimm diesen Frieden mit dir während du deinen Tag fortsetzt... Erinnere dich... du kannst immer zu diesem ruhigen Zentrum zurückkehren wenn du es brauchst... Danke dass du dir diese Zeit für dich genommen hast......"
      }
    ],

    focus: [
      {
        name: "Atemfokus Konzentration",
        intro: "Willkommen zu dieser Konzentrations- und Fokusmeditation... Setze dich bequem hin mit aufrechter und wacher Wirbelsäule... Lege deine Hände auf die Knie oder in den Schoß... Nimm dir einen Moment um eine Absicht für Klarheit und Fokus zu setzen... Wenn du bereit bist... schließe sanft die Augen...",
        
        breathing: "Beginne mit drei tiefen energetisierenden Atemzügen... Atme durch die Nase ein... fülle deine Lungen mit frischer Luft... Und atme vollständig durch den Mund aus... ... Noch einmal... atme tief ein... fühlst dich wach und aufmerksam... Atme vollständig aus... lass jeden mentalen Nebel los... Ein letztes Mal... atme Klarheit ein... atme Ablenkung aus... ... Lass deine Atmung nun normal werden... aber behalte deine Aufmerksamkeit bei jedem Atemzug......",
        
        anchorPractice: "Wir nutzen deinen Atem als Anker für deine Aufmerksamkeit... Fokussiere dich auf das Gefühl der Luft die in deine Nasenlöcher einströmt... Kühl beim Einatmen... Warm beim Ausatmen... ... Halte deine Aufmerksamkeit genau an der Nasenspitze... Wo du den Atem zuerst spürst... ... Wenn dein Geist wandert... und das wird er... bemerke einfach wohin er ging... Dann bringe sanft und ohne Urteil deine Aufmerksamkeit zurück zum Atem... Das ist die Übung... Bemerken... Zurückkehren... Immer wieder......",
        
        affirmations: "Wiederhole diese Affirmationen für den Fokus mental... 'Mein Geist ist klar und scharf'... ... 'Ich bin vollständig präsent und bewusst'... ... 'Meine Konzentration ist stark und stabil'... ... 'Ich fokussiere mich mit Leichtigkeit und Klarheit'... ... Lass diese Worte tief in dein Bewusstsein sinken......",
        
        closing: "Während wir diese Meditation beenden... Spüre die verbesserte Klarheit in deinem Geist... Deine verbesserte Fähigkeit dich zu fokussieren... ... Beginne deine Atmung zu vertiefen... Bewege deine Finger und Zehen... Und wenn du bereit bist... öffne die Augen... ... Bemerke wie wach und fokussiert du dich fühlst... Dein Geist ist klar... scharf und bereit... Nimm diese fokussierte Aufmerksamkeit mit in deine nächste Aktivität... Du bist vorbereitet mit Präzision und Klarheit zu arbeiten......"
      }
    ],

    anxiety: [
      {
        name: "Erdung bei Angst",
        intro: "Willkommen zu dieser Meditation zur Angstlinderung... Finde eine bequeme Position in der du dich unterstützt und sicher fühlst... Du kannst eine Hand auf dein Herz legen und eine auf deinen Bauch... Das hilft dir dich geerdet und mit dir selbst verbunden zu fühlen... Nimm dir einen Moment um vollständig hier anzukommen...",
        
        grounding: "Beginnen wir damit uns im gegenwärtigen Moment zu erden... Spüre deine Füße auf dem Boden... oder deinen Körper im Stuhl... Bemerke fünf Dinge die du jetzt fühlen kannst... Die Temperatur der Luft... Die Textur deiner Kleidung... Das Gewicht deines Körpers... ... Das ist real... Das ist jetzt... Du bist sicher in diesem Moment......",
        
        breathing: "Nun nutzen wir ein beruhigendes Atemmuster... Atme langsam vier Zählzeiten ein... eins... zwei... drei... vier... Halte sanft vier Zählzeiten... eins... zwei... drei... vier... Und atme langsam sechs Zählzeiten aus... eins... zwei... drei... vier... fünf... sechs... ... Dieses längere Ausatmen aktiviert die Entspannungsreaktion deines Körpers... Noch einmal... ein für vier... halten für vier... aus für sechs... ... Setze diesen beruhigenden Rhythmus fort... fühlst dich ruhiger mit jedem Zyklus......",
        
        affirmations: "Geben wir uns selbst einige beruhigende Affirmationen... 'Ich bin sicher in diesem Moment'... ... 'Dieses Gefühl wird vergehen'... ... 'Ich habe Angst schon früher überlebt und werde es wieder schaffen'... ... 'Ich bin stärker als meine Angst'... ... 'Frieden ist mein natürlicher Zustand'... ... 'Ich wähle die Ruhe'......",
        
        closing: "Während wir diese Meditation beenden... Erinnere dich dass du diese Werkzeuge immer zur Verfügung hast... Deinen Atem... Deinen sicheren Ort... Deine innere Stärke... ... Beginne deinen Körper sanft zu bewegen... Vielleicht dich ein wenig zu strecken... Atme tief ein und öffne langsam die Augen... ... Bemerke jede Veränderung in dem wie du dich fühlst... Selbst eine kleine Veränderung ist bedeutsam... Sei sanft zu dir selbst während du zu deinem Tag zurückkehrst... Du bist mutig... Du bist fähig... Und du bist nicht allein......"
      }
    ],

    energy: [
      {
        name: "Goldene Sonnen Energie",
        intro: "Willkommen zu dieser energetisierenden Meditation... Setze oder stelle dich in eine Position die sich stark und wach anfühlt... Stelle dir eine Schnur vor die dich von der Krone deines Kopfes nach oben zieht... Spüre wie sich deine Wirbelsäule verlängert... deine Brust öffnet... Du bist dabei deine natürliche Vitalität zu erwecken...",
        
        breathing: "Beginnen wir mit einigen energetisierenden Atemzügen... Atme tief durch die Nase ein... fülle deinen ganzen Körper mit frischer Energie... Und atme kräftig durch den Mund aus mit einem 'HA' Laut... lass alle Müdigkeit los... ... Noch einmal... atme Vitalität und Lebenskraft ein... Und atme 'HA' aus... lass Trägheit los... Ein letztes Mal... atme Kraft und Energie ein... Atme 'HA' aus... fühlst dich wacher......",
        
        energyVisualization: "Stelle dir eine helle goldene Sonne im Zentrum deiner Brust vor... Das ist deine innere Energiequelle... Mit jedem Atemzug wird diese Sonne heller und größer... ... Spüre ihre warmen Strahlen die sich durch deinen ganzen Körper ausbreiten... Nach oben durch Brust und Schultern... Nach unten durch deine Arme zu den Fingerspitzen... die vor Energie kribbeln... ... Das goldene Licht fließt nach oben durch Hals und Kopf... Dein Geist wird klar und wach... Nach unten durch Bauch und Hüften... Durch deine Beine... erdet dich während es dich energetisiert... ... Dein ganzer Körper strahlt mit lebendiger Lebenskraft......",
        
        affirmations: "Aktivieren wir deine Energie mit kraftvollen Affirmationen... 'Ich bin erfüllt von lebendiger Energie'... ... 'Mein Körper ist stark und lebendig'... ... 'Ich habe alle Energie die ich für meinen Tag brauche'... ... 'Ich bin motiviert und bereit für Handlung'... ... 'Energie fließt frei durch mich'... ... Spüre wie diese Worte jede Zelle deines Körpers aufladen......",
        
        closing: "Während wir diese energetisierende Meditation beenden... Spüre die Vitalität die durch deine Adern fließt... Du bist wach... aufmerksam und vollständig aufgeladen... ... Beginne deinen Körper zu bewegen wie es sich gut anfühlt... Vielleicht strecke deine Arme über den Kopf... Rolle deinen Nacken... Hüpfe sanft auf den Zehenspitzen... ... Wenn du bereit bist... öffne die Augen weit... Nimm die Welt mit frischer Energie auf... Du bist bereit deinen Tag mit Enthusiasmus und Kraft zu umarmen... Geh hinaus und lass dein Licht leuchten......"
      }
    ],

    mindfulness: [
      {
        name: "Achtsamkeit im Gegenwärtigen Moment",
        intro: "Willkommen zu dieser Achtsamkeitsmeditation... Finde eine bequeme Position wo du wachsam und entspannt sitzen kannst... Diese Praxis geht darum Bewusstsein für den gegenwärtigen Moment zu kultivieren... Es gibt nirgendwo hinzugehen und nichts zu erreichen... einfach hier und jetzt sein...",
        
        breathing: "Beginnen wir damit uns im Atem zu verankern... Bemerke deinen natürlichen Atemrhythmus... verändere nichts... beobachte einfach... ... Spüre die Luft die durch deine Nasenlöcher einströmt... die kleine Pause... und das sanfte Loslassen... ... Dein Atem geschieht immer im gegenwärtigen Moment... Nutze ihn als deinen Anker zum Hier und Jetzt... Wenn dein Geist wandert... kehre einfach zum Atem zurück... ohne Urteil... nur sanfte Rückkehr......",
        
        bodyAwareness: "Erweitere nun dein Bewusstsein um deinen Körper einzuschließen... Bemerke wie du sitzt... Spüre die Kontaktpunkte wo dein Körper die Oberfläche berührt... ... Scanne durch deinen Körper mit sanfter Neugier... Welche Empfindungen sind gerade da?... Vielleicht Wärme... Kühle... Spannung... Entspannung... ... Bemerke einfach was da ist... ohne etwas verändern zu wollen... Dein Körper ist ein Tor zur Gegenwart......",
        
        thoughtAwareness: "Während wir fortfahren... bemerke alle Gedanken die aufkommen... Anstatt dich in der Geschichte zu verfangen... schau ob du Gedanken wie Wolken beobachten kannst die durch den Himmel deines Geistes ziehen... ... Manche Gedanken sind leicht und zart... andere mögen schwere Gewitterwolken sein... Alle sind willkommen... alle werden vorübergehen... ... Du bist nicht deine Gedanken... du bist der bewusste Raum in dem Gedanken erscheinen und verschwinden......",
        
        presentMoment: "Genau jetzt... in diesem Moment... ist alles genau so wie es ist... Es gibt tiefen Frieden darin zu akzeptieren was hier ist... ohne Widerstand... ... Höre die Geräusche um dich herum... bemerke sie entstehen frisch in jedem Moment... ... Spüre die Lebendigkeit in deinem Körper... die Energie des Hier-Seins... jetzt... ... Dieser Moment ist der einzige Moment der jemals existiert... und er erneuert sich ständig......",
        
        affirmations: "Wiederhole still diese Affirmationen der Gegenwart... 'Ich bin vollständig präsent in diesem Moment'... ... 'Ich umarme alles was auftaucht mit Bewusstsein'... ... 'Meine Aufmerksamkeit ist im Jetzt verankert'... ... 'Ich bin bewusst... wach... lebendig'... ... 'Das Leben geschieht jetzt... und ich bin hier um es zu erfahren'......",
        
        closing: "Während wir diese Praxis beenden... Spüre die Tiefe deiner Gegenwart... Die Fülle des vollständigen Hier-Seins... ... Beginne deine Atmung zu vertiefen... Bewege sanft deine Finger... rolle deine Schultern... ... Wenn du bereit bist... öffne langsam die Augen... ... Nimm dieses Bewusstsein für den gegenwärtigen Moment mit dir... Das Leben ist eine Reihe von gegenwärtigen Momenten... Und jetzt weißt du wie du sie vollständig bewohnen kannst......"
      }
    ],

    compassion: [
      {
        name: "Liebevolle Güte Praxis",
        intro: "Willkommen zu dieser Meditation der liebevollen Güte... Setze dich bequem hin mit einem offenen Herzen... Diese Praxis geht darum Mitgefühl zu kultivieren... zuerst für dich selbst... dann für andere... Lege eine oder beide Hände auf dein Herz... spüre seine sanfte Bewegung... Wenn du bereit bist... schließe die Augen...",
        
        breathing: "Beginne mit einigen herzöffnenden Atemzügen... Atme in dein Herz ein... spüre wie es sich mit Wärme füllt... Atme aus und sende diese Wärme in die Welt... ... Noch einmal... atme Liebe ein... atme Güte aus... ... Setze diese herzbasierte Atmung fort... mit jedem Atemzug öffnest du dich mehr für Mitgefühl... für dich selbst und alle Wesen......",
        
        selfCompassion: "Beginnen wir mit liebevoller Güte für dich selbst... Bringe dich selbst in deinen Geist... wie du jetzt hier sitzt... ... Wiederhole diese Sätze still für dich... spüre ihre Bedeutung... 'Möge ich glücklich sein'... ... 'Möge ich gesund sein'... ... 'Möge ich in Sicherheit leben'... ... 'Möge ich mit Leichtigkeit leben'... ... 'Möge ich mich selbst so akzeptieren wie ich bin'... ... Spüre diese Wünsche in deinem Herzen... Du verdienst Liebe und Güte... besonders von dir selbst......",
        
        lovedOne: "Bringe nun jemanden in deinen Geist den du liebst... Vielleicht einen Freund... ein Familienmitglied... oder ein Haustier... Sieh ihr Gesicht... spüre deine Liebe für sie... ... Sende ihnen diese liebevollen Wünsche... 'Mögest du glücklich sein'... ... 'Mögest du gesund sein'... ... 'Mögest du in Sicherheit leben'... ... 'Mögest du mit Leichtigkeit leben'... ... 'Mögest du geliebt werden'... ... Spüre dein Herz sich mit Wärme für diese Person füllen......",
        
        neutralPerson: "Nun bringe jemanden neutralen in deinen Geist... Vielleicht einen Nachbarn... einen Kassierer... jemanden den du kennst aber nicht gut... Erkenne dass auch sie nach Glück suchen... ... Sende ihnen dieselben liebevollen Wünsche... 'Mögest du glücklich sein'... ... 'Mögest du gesund sein'... ... 'Mögest du in Sicherheit leben'... ... 'Mögest du mit Leichtigkeit leben'... ... Spüre dein Mitgefühl sich auf alle Wesen ausdehnen......",
        
        allBeings: "Schließlich erweitere dein Mitgefühl auf alle Wesen überall... Stelle dir vor deine liebevolle Güte strahlt aus wie die Sonne... berührt jeden den sie erreicht... ... 'Mögen alle Wesen glücklich sein'... ... 'Mögen alle Wesen gesund sein'... ... 'Mögen alle Wesen in Sicherheit leben'... ... 'Mögen alle Wesen mit Leichtigkeit leben'... ... 'Möge die ganze Welt erfüllt sein von liebevoller Güte'... ... Spüre dein Herz weit offen... verbunden mit allem Leben......",
        
        closing: "Während wir diese Praxis beenden... Spüre die Wärme des Mitgefühls in deinem Herzen... Diese liebevolle Güte ist immer verfügbar... eine Quelle der Heilung für dich und die Welt... ... Beginne deine Atmung zu vertiefen... Bewege sanft deine Hände... ... Wenn du bereit bist... öffne die Augen... ... Nimm dieses offene Herz mit dir... Mögest du durch deinen Tag gehen mit Güte zu dir selbst und anderen... Die Welt braucht dein Mitgefühl......"
      }
    ],

    walking: [
      {
        name: "Achtsame Gehmeditation",
        intro: "Willkommen zu dieser achtsamen Gehmeditation... Diese Praxis kann drinnen oder draußen gemacht werden... Finde einen Weg von etwa 10 bis 20 Schritten... oder einfach einen Bereich wo du langsam gehen kannst... Stehe am Anfang deines Weges... spüre deine Füße auf dem Boden... Wenn du bereit bist... beginne sehr langsam zu gehen...",
        
        preparation: "Bevor wir anfangen zu gehen... stehe still und spüre deinen Körper... Spüre deine Füße fest auf dem Boden... das Gewicht deines Körpers... die Länge deiner Wirbelsäule... ... Atme ein paar Mal tief ein... spüre dich geerdet und präsent... Setze eine Absicht für achtsames Gehen... vielleicht einfach vollständig hier zu sein bei jedem Schritt......",
        
        walkingPractice: "Beginne nun sehr langsam zu gehen... langsamere als gewöhnlich... Spüre das Heben deines einen Fußes... das Bewegen durch die Luft... das Platzieren auf dem Boden... ... Dann das Gewicht das sich verschiebt... das Heben des anderen Fußes... bewegen... platzieren... ... Lasse jeden Schritt eine Meditation sein... Heben... bewegen... platzieren... Gewicht verschieben... ... Wenn dein Geist wandert... bringe ihn sanft zurück zu den Empfindungen des Gehens......",
        
        coordination: "Koordiniere nun deine Atmung mit deinem Gehen... Vielleicht ein Atemzug pro Schritt... oder ein Atemzug für mehrere Schritte... Finde deinen eigenen Rhythmus... ... Spüre die Verbindung zwischen Atem und Bewegung... zwischen Körper und Geist... Du bist vollständig präsent in dieser einfachen Handlung des Gehens... ... Wenn du ans Ende deines Weges kommst... drehe dich achtsam um... pausiere... und beginne in die andere Richtung......",
        
        awareness: "Während du weiter gehst... erweitere dein Bewusstsein... Bemerke was du siehst... hörst... riechst... fühlst... ... Vielleicht die Temperatur der Luft... die Qualität des Lichts... die Geräusche um dich herum... ... Alles ist Teil deiner Meditation... Jeden Schritt... jeden Atemzug... jeden Moment der Wahrnehmung... ... Du bewegst dich durch die Welt mit vollständiger Aufmerksamkeit... vollständiger Gegenwart......",
        
        gratitude: "Während du weiter gehst... bringe Dankbarkeit für deinen Körper auf... für deine Füße die dich tragen... für deine Beine die dich bewegen... für deine Fähigkeit zu gehen... ... Dankbarkeit für diesen Moment... für diesen Ort... für diese Gelegenheit zur Achtsamkeit... ... Jeder Schritt ist ein Geschenk... jeder Atemzug eine Gelegenheit für Gegenwart......",
        
        closing: "Während wir diese Gehmeditation beenden... komme langsam zum Stillstand... Stehe einen Moment still... spüre deine Füße auf dem Boden... ... Bemerke wie du dich fühlst... vielleicht geerdet... zentriert... präsent... ... Du kannst achtsames Gehen jederzeit praktizieren... wo immer du bist... Es ist eine wunderbare Weise Meditation in dein tägliches Leben zu integrieren... ... Danke dass du dir diese Zeit genommen hast für achtsame Bewegung......"
      }
    ],

    breathing: [
      {
        name: "Vollständige Atempraxis",
        intro: "Willkommen zu dieser vollständigen Atempraxis... Diese Meditation wird dich durch verschiedene Atemtechniken führen um dein Bewusstsein zu vertiefen und dein Nervensystem zu beruhigen... Setze dich bequem hin mit geradem Rücken... Lege eine Hand auf deine Brust... die andere auf deinen Bauch... Wenn du bereit bist... schließe die Augen...",
        
        naturalBreath: "Beginne einfach deinen natürlichen Atem zu beobachten... Ohne etwas zu verändern... bemerke nur den Rhythmus... die Tiefe... das Tempo... ... Spüre die Hand auf deiner Brust... die andere auf dem Bauch... Welche bewegt sich mehr?... Beurteile nicht... beobachte einfach... ... Dein Atem ist ein Spiegel deines inneren Zustands... Lass ihn dir zeigen wie du dich gerade fühlst... ohne zu versuchen etwas zu ändern......",
        
        deepBreathing: "Nun beginnen wir mit tiefem Atmen... Atme langsam und tief durch die Nase ein... fülle zuerst den Bauch... dann die Brust... ... Pausiere einen Moment am oberen Ende des Einatmens... spüre die Fülle... ... Dann atme langsam durch die Nase oder den Mund aus... lass die Brust sich senken... dann den Bauch... ... Wiederhole dies mehrere Male... ein... fülle... pausiere... aus... leere... ... Spüre wie sich dein Nervensystem mit jedem tiefen Atemzug beruhigt......",
        
        countedBreath: "Nun fügen wir Zählen hinzu... Atme für vier Zählzeiten ein... eins... zwei... drei... vier... Halte für vier... eins... zwei... drei... vier... Atme für vier aus... eins... zwei... drei... vier... Halte für vier... eins... zwei... drei... vier... ... Dieses 4-4-4-4 Muster hilft den Geist zu beruhigen... Wenn vier zu viel ist... versuche drei... oder bleib bei dem was sich natürlich anfühlt... ... Setze dieses rhythmische Atmen fort... spüre die Ruhe die es bringt......",
        
        nostrilBreathing: "Nun versuchen wir Wechselatmung... Verwende deinen rechten Daumen um dein rechtes Nasenloch zu schließen... Atme durch das linke Nasenloch ein... ... Schließe das linke Nasenloch mit deinem Zeigefinger... öffne das rechte... atme durch rechts aus... ... Atme durch rechts ein... schließe rechts... öffne links... atme durch links aus... ... Das ist ein Zyklus... Setze fort... links ein... rechts aus... rechts ein... links aus... ... Diese Praxis bringt die beiden Gehirnhälften ins Gleichgewicht......",
        
        breathAwareness: "Kehre nun zu natürlichem Atmen zurück... Lege beide Hände in den Schoß... Bemerke einfach jeden Atemzug... ein... aus... ein... aus... ... Spüre die Empfindung der Luft in deinen Nasenlöchern... kühl beim Einatmen... warm beim Ausatmen... ... Bemerke die Pausen zwischen den Atemzügen... die natürlichen Rhythmen deines Körpers... ... Dein Atem ist immer verfügbar als Anker zur Gegenwart... als Quelle der Ruhe......",
        
        closing: "Während wir diese Atempraxis beenden... Nimm einen Moment um zu bemerken wie du dich fühlst... Vielleicht ruhiger... zentrierter... präsenter... ... Diese Atemtechniken sind Werkzeuge die du jederzeit verwenden kannst... bei Stress... Angst... oder einfach um dich zu erden... ... Beginne deine Atmung zu vertiefen... Bewege sanft deine Finger... rolle deine Schultern... ... Wenn du bereit bist... öffne langsam die Augen... ... Nimm dieses Bewusstsein für den Atem mit dir... Es ist ein Geschenk das immer bei dir ist......"
      }
    ],

    morning: [
      {
        name: "Morgendämmerung Erwachen",
        intro: "Willkommen zu dieser Morgenmeditation... Eine Zeit des Erwachens und der Erneuerung... Setze dich bequem hin... vielleicht in der Nähe eines Fensters wo du das Morgenlicht spüren kannst... Fühle die Frische dieses neuen Tages... die Möglichkeiten die vor dir liegen... Wenn du bereit bist... schließe sanft die Augen oder lasse sie weich geöffnet...",
        
        awakening: "Beginne damit die Energie des Morgens zu spüren... Selbst wenn du müde bist... ist da eine Qualität der Erneuerung... der Neugeburt... ... Atme die frische Morgenluft... spüre deinen Körper der sich von der Nacht erholt... Strecke dich wenn du möchtest... rolle deine Schultern... bewege deinen Nacken... ... Du erwachst nicht nur aus dem Schlaf... sondern zu einem neuen Tag voller Möglichkeiten......",
        
        gratitude: "Bringe Dankbarkeit für diesen neuen Tag auf... 'Ich bin dankbar für diese Nacht der Ruhe'... ... 'Ich bin dankbar für diesen neuen Tag'... ... 'Ich bin dankbar für meinen Körper der mich trägt'... ... 'Ich bin dankbar für meine Fähigkeit zu atmen... zu fühlen... zu sein'... ... 'Ich bin dankbar für alle Möglichkeiten die heute vor mir liegen'... ... Lass diese Dankbarkeit dein Herz mit Wärme füllen......",
        
        intention: "Nun setze eine Absicht für deinen Tag... Nicht eine To-Do-Liste... sondern eine Qualität des Seins... ... Vielleicht 'Ich wähle heute präsent zu sein'... ... Oder 'Ich wähle heute freundlich zu mir selbst und anderen zu sein'... ... Oder 'Ich wähle heute neugierig und offen zu sein'... ... Spüre diese Absicht in deinem Körper... lass sie durch dein ganzes Sein durchdringen......",
        
        energy: "Stelle dir nun vor die Sonne geht in deinem Herzen auf... Ein warmes goldenes Licht das sich durch deinen ganzen Körper ausbreitet... ... Dieses Licht bringt Energie... Klarheit... Motivation... Es füllt jede Zelle mit Vitalität... ... Spüre diese Energie nach oben durch deine Brust... deinen Hals... deinen Kopf... Nach unten durch deinen Bauch... deine Beine... zu deinen Füßen... ... Du glühst mit innerer Sonne... bereit für was auch immer der Tag bringt......",
        
        affirmations: "Wiederhole diese Morgenaffirmationen... 'Ich begrüße diesen Tag mit Offenheit'... ... 'Ich habe die Kraft alle Herausforderungen zu bewältigen'... ... 'Ich bin bereit zu lernen und zu wachsen'... ... 'Ich bringe Güte in die Welt'... ... 'Dieser Tag ist voller Möglichkeiten'... ... 'Ich vertraue meiner Fähigkeit zu gedeihen'... ... Spüre diese Worte dich von innen stärken......",
        
        closing: "Während wir diese Morgenmeditation beenden... Spüre dich bereit und energetisiert für den Tag... Dein Geist ist klar... dein Herz ist offen... dein Körper ist wach... ... Beginne deine Atmung zu vertiefen... Bewege sanft deine Finger und Zehen... vielleicht strecke dich noch einmal... ... Wenn du bereit bist... öffne die Augen und begrüße den Tag... ... Nimm diese Energie... diese Absicht... diese Dankbarkeit mit dir... Du bist bereit für einen schönen Tag... Guten Morgen......"
      }
    ]
  },

  // Italian meditation templates
  it: {
    sleep: [
      {
        name: "Scansione Corporea per Dormire",
        intro: "Benvenuto in questa meditazione pacifica per dormire... Trova una posizione comoda nel tuo letto... permetti al tuo corpo di sprofondare nel materasso... Chiudi dolcemente gli occhi e inizia a notare il tuo respiro... Non c'è niente che devi fare ora... tranne rilassarti e ascoltare la mia voce...",
        
        breathing: "Iniziamo con alcuni respiri calmanti... Respira lentamente attraverso il naso... conta fino a cinque... uno... due... tre... quattro... cinque... Trattieni delicatamente il respiro... uno... due... tre... quattro... cinque... E ora espira lentamente attraverso la bocca... uno... due... tre... quattro... cinque... Lascia che il tuo respiro torni al suo ritmo naturale... ti senti più rilassato ad ogni respiro......",
        
        bodyRelaxation: "Ora faremo una dolce scansione corporea per rilasciare qualsiasi tensione... Inizia portando la tua attenzione ai tuoi piedi... Senti come diventano pesanti e caldi... Lascia che quella pesantezza fluisca verso l'alto attraverso le tue caviglie... i tuoi polpacci... le tue ginocchia... Senti le tue gambe sprofondare più in profondità nel letto... ... Ora porta la tua attenzione ai tuoi fianchi e alla parte bassa della schiena... Lasciali ammorbidire e rilasciare... Senti il tuo ventre che sale e scende ad ogni respiro... Il tuo petto che si espande dolcemente... ... Porta la tua consapevolezza alle tue spalle... Lasciale cadere lontano dalle tue orecchie... Senti il peso delle tue braccia... pesanti e rilassate... Le tue mani riposano pacificamente... ... Nota il tuo collo... Lascialo allungare e ammorbidire... La tua mascella si rilassa... Il tuo viso diventa pacifico... Anche i piccoli muscoli intorno ai tuoi occhi si rilasciano......",
        
        visualization: "Immagina te stesso in un luogo pacifico... Forse sei sdraiato su una soffice nuvola... fluttuando dolcemente attraverso un cielo stellato... O forse stai riposando in un bellissimo giardino... circondato dal dolce profumo della lavanda... L'aria ha la temperatura perfetta... Ti senti completamente al sicuro e protetto... ... Ad ogni respiro, derivi più profondamente nel rilassamento... La tua mente diventa silenziosa e tranquilla... come un lago calmo che riflette la luna... Qualsiasi pensiero che sorge fluttua semplicemente come nuvole... Non hai bisogno di aggrapparti a nulla......",
        
        affirmations: "Mentre riposi qui in perfetta pace... sappi che... Sei al sicuro... Sei caldo... Sei protetto... Sei amato... ... Il tuo corpo sa come dormire... È sicuro lasciarsi andare ora... Meriti questo riposo... Domani si prenderà cura di se stesso... ... In questo momento... in questo presente... tutto è esattamente come dovrebbe essere......",
        
        closing: "Continua a riposare in questo stato pacifico... Il tuo corpo è pesante e rilassato... La tua mente è calma e silenziosa... Ad ogni respiro, sprofondi più in profondità nel sonno riparatore... ... Ti lascio ora per scivolare in sogni pacifici... Dormi bene... Riposa profondamente... E svegliati rinfrescato quando è il momento... Sogni d'oro......"
      }
    ],

    stress: [
      {
        name: "Consapevolezza per Alleviare lo Stress",
        intro: "Benvenuto in questa meditazione per alleviare lo stress... Trova una posizione seduta comoda... la tua schiena dritta ma non rigida... Appoggia i piedi ben piantati sul pavimento... senti il terreno sotto di te... Posa le mani dolcemente sulle tue cosce... E quando sei pronto... chiudi gli occhi o abbassa dolcemente lo sguardo...",
        
        breathing: "Iniziamo prendendo alcuni respiri profondi e purificanti... Respira attraverso il naso... riempiendo completamente i tuoi polmoni... Ed espira attraverso la bocca... rilasciando qualsiasi tensione... ... Ancora una volta... respira profondamente... sentendo il tuo petto e ventre espandersi... Ed espira... lasciando andare stress e preoccupazioni... Un'altra volta... respira energia fresca e calmante... Ed espira tutto ciò che non ti serve più......",
        
        bodyAwareness: "Ora porta la tua attenzione al tuo corpo... Nota qualsiasi area dove stai trattenendo tensione... Forse nelle tue spalle... la tua mascella... il tuo ventre... ... Senza cercare di cambiare nulla... semplicemente nota queste sensazioni... Riconoscile con gentilezza... ... Ora immagina di respirare in queste aree tese... Ad ogni inspirazione... invia respiro e spazio alla tensione... Ad ogni espirazione... senti la rigidità iniziare ad ammorbidirsi... ... Continua questa respirazione dolce... dentro... creando spazio... fuori... rilasciando tensione......",
        
        mindfulness: "Lascia che la tua attenzione riposi nel momento presente... Nota la sensazione del tuo respiro che entra ed esce... Il dolce salire e scendere del tuo petto... ... Quando sorgono pensieri sulla tua giornata... e lo faranno... semplicemente notali senza giudizio... Come nuvole che passano nel cielo... Lasciale fluttuare via... ... Ritorna al tuo respiro... Questa è la tua ancora... Sempre disponibile... Sempre presente... ... Non c'è niente che devi capire ora... Nessun problema da risolvere... Solo questo respiro... poi il prossimo......",
        
        visualization: "Immagina una luce dorata e calda sopra la tua testa... Questa è la luce della pace e della calma... Ad ogni respiro... questa luce fluisce verso il basso attraverso il tuo corpo... ... Fluisce attraverso la tua testa... rilasciando tensione mentale... Giù attraverso il tuo collo e spalle... sciogliendo lo stress... Attraverso il tuo petto... calmando il tuo cuore... Giù attraverso le tue braccia fino alle punte delle dita... ... La luce dorata continua attraverso il tuo ventre... calmando qualsiasi ansia... Giù attraverso i tuoi fianchi e gambe... radicandoti... Fino alle tue dita dei piedi... ... Ora sei riempito di questa luce dorata pacifica......",
        
        closing: "Mentre ci prepariamo a terminare questa meditazione... Sappi che questa sensazione di calma è sempre disponibile per te... A pochi respiri di distanza... ... Inizia a muovere le dita delle mani e dei piedi... Ruota dolcemente le spalle... E quando sei pronto... apri lentamente gli occhi... ... Prenditi un momento per notare come ti senti... Porta questa pace con te mentre continui la tua giornata... Ricorda... puoi sempre tornare a questo centro calmo quando ne hai bisogno... Grazie per aver preso questo tempo per te stesso......"
      }
    ],

    focus: [
      {
        name: "Concentrazione con Ancoraggio Respiratorio",
        intro: "Benvenuto in questa meditazione di concentrazione e focus... Siediti comodamente con la colonna vertebrale eretta e vigile... Appoggia le mani sulle ginocchia o in grembo... Prenditi un momento per stabilire un'intenzione di chiarezza e focus... Quando sei pronto... chiudi dolcemente gli occhi...",
        
        breathing: "Inizia prendendo tre respiri profondi ed energizzanti... Respira attraverso il naso... riempiendo i tuoi polmoni di aria fresca... Ed espira completamente attraverso la bocca... ... Ancora una volta... inspira profondamente... sentendoti vigile e sveglio... Espira completamente... rilasciando qualsiasi nebbia mentale... Un'altra volta... respira chiarezza... espira distrazione... ... Ora lascia che il tuo respiro ritorni normale... ma mantieni la tua attenzione su ogni respiro......",
        
        anchorPractice: "Useremo il tuo respiro come ancora per la tua attenzione... Concentrati sulla sensazione dell'aria che entra nelle tue narici... Fresca all'inspirazione... Calda all'espirazione... ... Mantieni la tua attenzione proprio sulla punta del naso... Dove senti per primo il respiro... ... Quando la tua mente vaga... e lo farà... semplicemente nota dove è andata... Poi dolcemente... senza giudizio... riporta la tua attenzione al respiro... Questa è la pratica... Notare... Ritornare... Ancora e ancora......",
        
        affirmations: "Ripeti mentalmente queste affermazioni per il focus... 'La mia mente è chiara e acuta'... ... 'Sono completamente presente e consapevole'... ... 'La mia concentrazione è forte e stabile'... ... 'Mi concentro con facilità e chiarezza'... ... Lascia che queste parole affondino profondamente nella tua coscienza......",
        
        closing: "Mentre completiamo questa meditazione... Senti la chiarezza migliorata nella tua mente... La tua capacità migliorata di concentrarti... ... Inizia ad approfondire il tuo respiro... Muovi le dita delle mani e dei piedi... E quando sei pronto... apri gli occhi... ... Nota quanto ti senti vigile e concentrato... La tua mente è chiara... acuta e pronta... Porta questa attenzione focalizzata nella tua prossima attività... Sei preparato a lavorare con precisione e chiarezza......"
      }
    ],

    anxiety: [
      {
        name: "Radicamento per l'Ansia",
        intro: "Benvenuto in questa meditazione per alleviare l'ansia... Trova una posizione comoda dove ti senti supportato e sicuro... Puoi mettere una mano sul tuo cuore e una sul tuo ventre... Questo ti aiuta a sentirti radicato e connesso con te stesso... Prenditi un momento per arrivare completamente qui...",
        
        grounding: "Iniziamo radicandoci nel momento presente... Senti i tuoi piedi sul pavimento... o il tuo corpo nella sedia... Nota cinque cose che puoi sentire ora... La temperatura dell'aria... La texture dei tuoi vestiti... Il peso del tuo corpo... ... Questo è reale... Questo è ora... Sei al sicuro in questo momento......",
        
        breathing: "Ora usiamo un pattern di respiro calmante... Respira lentamente per quattro conteggi... uno... due... tre... quattro... Trattieni dolcemente per quattro... uno... due... tre... quattro... Ed espira lentamente per sei... uno... due... tre... quattro... cinque... sei... ... Questa espirazione più lunga attiva la risposta di rilassamento del tuo corpo... Ancora... dentro per quattro... trattieni per quattro... fuori per sei... ... Continua questo ritmo calmante... sentendoti più calmo ad ogni ciclo......",
        
        affirmations: "Offriamoci alcune affermazioni calmanti... 'Sono al sicuro in questo momento'... ... 'Questa sensazione passerà'... ... 'Ho sopravvissuto all'ansia prima e la sopravviverò di nuovo'... ... 'Sono più forte della mia ansia'... ... 'La pace è il mio stato naturale'... ... 'Scelgo la calma'......",
        
        closing: "Mentre terminiamo questa meditazione... Ricorda che hai sempre questi strumenti disponibili... Il tuo respiro... Il tuo posto sicuro... La tua forza interiore... ... Inizia a muovere dolcemente il tuo corpo... Forse allungati un po'... Fai un respiro profondo e apri lentamente gli occhi... ... Nota qualsiasi cambiamento in come ti senti... Anche un piccolo cambiamento è significativo... Sii gentile con te stesso mentre torni alla tua giornata... Sei coraggioso... Sei capace... E non sei solo......"
      }
    ],

    energy: [
      {
        name: "Energia del Sole Dorato",
        intro: "Benvenuto in questa meditazione energizzante... Siediti o stai in piedi in una posizione che si senta forte e vigile... Immagina una corda che ti tira verso l'alto dalla corona della tua testa... Senti la tua colonna vertebrale allungarsi... il tuo petto aprirsi... Stai per risvegliare la tua vitalità naturale...",
        
        breathing: "Iniziamo con alcuni respiri energizzanti... Fai un respiro profondo attraverso il naso... riempiendo tutto il tuo corpo di energia fresca... Ed espira vigorosamente attraverso la bocca con un suono 'HA'... rilasciando qualsiasi fatica... ... Ancora una volta... respira vitalità e forza vitale... Ed espira 'HA'... lasciando andare la pigrizia... Un'altra volta... inspira potenza ed energia... Espira 'HA'... sentendoti più sveglio......",
        
        energyVisualization: "Immagina un sole dorato brillante al centro del tuo petto... Questa è la tua fonte interiore di energia... Ad ogni respiro... questo sole diventa più brillante e più grande... ... Senti i suoi raggi caldi che si diffondono attraverso tutto il tuo corpo... Su attraverso il tuo petto e spalle... Giù attraverso le tue braccia fino alle punte delle dita... che formicolano di energia... ... La luce dorata fluisce su attraverso la tua gola e testa... La tua mente diventa chiara e vigile... Giù attraverso il tuo ventre e fianchi... Attraverso le tue gambe... radicandoti mentre ti energizza... ... Tutto il tuo corpo risplende di forza vitale vibrante......",
        
        affirmations: "Attiviamo la tua energia con affermazioni potenti... 'Sono riempito di energia vibrante'... ... 'Il mio corpo è forte e vivo'... ... 'Ho tutta l'energia di cui ho bisogno per la mia giornata'... ... 'Sono motivato e pronto all'azione'... ... 'L'energia fluisce liberamente attraverso di me'... ... Senti queste parole caricare ogni cellula del tuo corpo......",
        
        closing: "Mentre completiamo questa meditazione energizzante... Senti la vitalità che scorre nelle tue vene... Sei sveglio... vigile e completamente carico... ... Inizia a muovere il tuo corpo come ti fa sentire bene... Forse allunga le braccia sopra la testa... Ruota il collo... Rimbalza dolcemente sulle punte dei piedi... ... Quando sei pronto... apri gli occhi spalancati... Prendi il mondo con energia fresca... Sei pronto ad abbracciare la tua giornata con entusiasmo e potenza... Vai avanti e fai brillare la tua luce......"
      }
    ],

    mindfulness: [
      {
        name: "Consapevolezza del Momento Presente",
        intro: "Benvenuto in questa meditazione di consapevolezza del momento presente... Trova una posizione seduta comoda e dignitosa... La tua schiena dritta ma non rigida... Le tue spalle rilassate lontano dalle orecchie... Appoggia le mani naturalmente... Quando sei pronto... chiudi dolcemente gli occhi e porta la tua attenzione al qui e ora...",
        
        breathing: "Iniziamo ancorandoci nel momento presente attraverso il respiro... Nota il respiro che entra naturalmente... e che esce naturalmente... Non c'è bisogno di cambiare nulla... solo osservare... ... Senti l'aria fresca che entra attraverso le tue narici... Senti l'aria calda che esce... Ogni respiro è un'opportunità per tornare al presente... ... Semplicemente... inspira... espira... Essere qui... proprio qui... in questo momento......",
        
        bodyAwareness: "Ora espandi la tua consapevolezza al tuo corpo... Nota la sensazione di essere seduto... Il contatto con la sedia o il cuscino... La solidità del pavimento sotto i tuoi piedi... ... Porta l'attenzione alla tua postura... Il peso del tuo corpo... La temperatura dell'aria sulla tua pelle... ... Forse noti tensione da qualche parte... o comfort... o neutralità... Qualsiasi cosa tu stia sperimentando... è perfettamente ok... Semplicemente osserva con gentilezza e curiosità......",
        
        mindfulListening: "Ora apri la tua consapevolezza ai suoni intorno a te... Senza cercare di identificare o giudicare... semplicemente lascia che i suoni arrivino alle tue orecchie... ... Forse senti suoni vicini... suoni lontani... suoni del tuo stesso corpo... ... Nota come i suoni sorgono e svaniscono... Come onde che arrivano e si ritirano... ... Lascia che ogni suono sia solo quello che è... Un'altra porta verso il momento presente......",
        
        thoughtObservation: "Ora nota i pensieri che passano attraverso la tua mente... Come nuvole che si muovono nel cielo... Alcuni pensieri sono leggeri e veloci... altri più pesanti e lenti... ... Non c'è bisogno di fermarli o seguirli... Semplicemente osserva... Ecco un pensiero... ed ecco che se ne va... ... Ogni volta che ti accorgi di essere stato trascinato in un pensiero... dolcemente... senza giudizio... ritorna al momento presente... Questo è il cuore della pratica della consapevolezza......",
        
        presentMoment: "Ora porta la tua attenzione all'esperienza totale di essere qui ora... Il tuo respiro... Il tuo corpo... I suoni... I pensieri... tutto insieme... ... Questo è il momento presente... Non il momento fa... non il momento dopo... ma questo momento... ... Nota come questo momento è sempre qui... sempre disponibile... sempre fresco... ... Sei completamente qui... completamente presente... completamente vivo in questo momento......",
        
        closing: "Mentre ci prepariamo a terminare questa meditazione... Ricorda che questo momento presente è sempre qui per te... Sempre accessibile... sempre a portata di respiro... ... Inizia a muovere dolcemente le dita delle mani e dei piedi... Allunga le braccia se lo desideri... Fai un respiro profondo... ... Quando sei pronto... apri lentamente gli occhi... Porta questa qualità di presenza consapevole con te... Ogni momento è un'opportunità per essere pienamente qui... Grazie per aver praticato la consapevolezza......"
      }
    ],

    compassion: [
      {
        name: "Pratica di Amorevole Gentilezza",
        intro: "Benvenuto in questa meditazione di compassione e amorevole gentilezza... Trova una posizione comoda che si senta aperta e ricettiva... Posa una mano sul tuo cuore se ti fa sentire connesso... Prendi un momento per impostare l'intenzione di aprire il tuo cuore... Quando sei pronto... chiudi dolcemente gli occhi...",
        
        selfCompassion: "Iniziamo offrendo gentilezza e compassione a noi stessi... Porta alla mente un'immagine di te stesso come un bambino... Innocente... meritevole di amore... ... Invia a questo bambino i tuoi auguri amorevoli... Possa io essere felice... Possa io essere in pace... Possa io essere libero dalla sofferenza... Possa io essere riempito di amore... ... Senti questi auguri che scaldano il tuo cuore... Nota qualsiasi resistenza senza giudizio... e dolcemente ritorna agli auguri amorevoli... ... Sei degno di gentilezza... Sei degno di compassione... Sei degno di amore... soprattutto dal tuo stesso cuore......",
        
        lovedOne: "Ora porta alla mente qualcuno che ami facilmente... Forse un familiare... un amico... o anche un animale domestico... Vedi il loro viso... Senti l'amore che provi per loro... ... Invia loro i tuoi auguri amorevoli... Possa tu essere felice... Possa tu essere in pace... Possa tu essere libero dalla sofferenza... Possa tu essere riempito di amore... ... Senti il tuo cuore espandersi con questi auguri... Nota la gioia che viene dal voler bene a qualcuno... Questa è la natura naturale del cuore aperto......",
        
        neutralPerson: "Ora porta alla mente qualcuno neutrale... forse qualcuno che hai visto oggi ma non conosci bene... Un commesso... un vicino... un passante... ... Ricorda che anche questa persona vuole essere felice... vuole evitare la sofferenza... proprio come te... ... Invia loro i tuoi auguri amorevoli... Possa tu essere felice... Possa tu essere in pace... Possa tu essere libero dalla sofferenza... Possa tu essere riempito di amore... ... Nota come il tuo cuore può aprirsi anche a chi non conosci bene... Siamo tutti interconnessi nel nostro desiderio di felicità......",
        
        difficultPerson: "Ora se ti senti pronto... porta alla mente qualcuno con cui hai difficoltà... Inizia con qualcuno solo leggermente difficile... non la persona più difficile della tua vita... ... Ricorda che anche questa persona soffre... anche questa persona vuole essere felice... È dalla loro sofferenza che spesso arriva il comportamento difficile... ... Prova a inviare loro piccoli auguri amorevoli... Possa tu essere libero dalla sofferenza... Possa tu trovare pace... ... Se senti resistenza... va bene... Semplicemente torna agli auguri per te stesso... La compassione inizia sempre a casa......",
        
        allBeings: "Ora espandi la tua compassione a tutti gli esseri viventi... Immagina il tuo amore che si irradia fuori da te... toccando tutti nella tua città... nel tuo paese... in tutto il mondo... ... Tutti vogliono essere felici... Tutti vogliono evitare la sofferenza... Tutti meritano gentilezza e compassione... ... Possa tutti gli esseri essere felici... Possa tutti gli esseri essere in pace... Possa tutti gli esseri essere liberi dalla sofferenza... Possa tutti gli esseri essere riempiti di amore... ... Senti il tuo cuore connesso al cuore di tutti gli esseri viventi......",
        
        closing: "Mentre terminiamo questa meditazione di compassione... Porta le mani al tuo cuore... Senti la warmth e l'apertura che hai coltivato... ... Ricorda che puoi sempre tornare a questi auguri amorevoli... quando stai lottando... quando qualcuno ti ferisce... quando il mondo sembra difficile... ... Inizia a muovere dolcemente il tuo corpo... Fai un respiro profondo... E quando sei pronto... apri gli occhi... ... Porta questa gentilezza amorevole con te nel mondo... Sii paziente con te stesso e con gli altri... Il mondo ha bisogno del tuo cuore aperto......"
      }
    ],

    walking: [
      {
        name: "Pratica di Camminata Consapevole",
        intro: "Benvenuto in questa meditazione di camminata consapevole... Trova un percorso dove puoi camminare lentamente e in sicurezza... Può essere dentro o fuori... lungo o corto... ... Inizia stando fermo... Senti i tuoi piedi collegati al terreno... Nota la tua postura... Il peso del tuo corpo... Quando sei pronto... inizieremo a camminare lentamente e consapevolmente...",
        
        standingAwareness: "Prima di iniziare a camminare... porta la tua consapevolezza al tuo corpo in piedi... Senti la solidità del terreno sotto i tuoi piedi... Il tuo corpo eretto contro la gravità... ... Nota l'equilibrio sottile che il tuo corpo mantiene automaticamente... La danza costante di micro-aggiustamenti... ... Senti il peso del tuo corpo... distribuito tra i tuoi piedi... Nota qualsiasi sensazione nelle tue gambe... nei tuoi piedi... nella tua schiena... ... Questa è la tua base... il tuo fondamento... Da qui inizieremo il nostro viaggio consapevole......",
        
        beginningSteps: "Ora inizia a camminare molto lentamente... Solleva un piede... Senti il peso trasferirsi all'altro piede... Muovi il piede in avanti... Appoggialo gentilmente a terra... ... Ora solleva l'altro piede... Senti il cambiamento di peso... Muovi... Appoggia... ... Ogni passo è una meditazione... Ogni passo è un momento di consapevolezza... Non c'è fretta... Non c'è destinazione... Solo questo passo... poi il prossimo......",
        
        footSensations: "Porta la tua attenzione alle sensazioni nei tuoi piedi... Senti il contatto con il terreno... La texture... La temperatura... La pressione... ... Nota il rollio naturale del piede... Dal tallone... attraverso la pianta... fino alle dita... ... Senti i muscoli delle tue gambe che lavorano... Il modo in cui il tuo corpo si muove nello spazio... L'equilibrio dinamico del camminare... ... Ogni passo è un miracolo di coordinazione... Un dono del tuo corpo incredibile......",
        
        bodyInMotion: "Ora espandi la tua consapevolezza all'intero corpo che cammina... Nota come le tue braccia si muovono naturalmente... Il dondolio gentile del tuo torso... ... Senti la tua respirazione che continua mentre cammini... Forse cambia ritmo... Forse rimane costante... Semplicemente osserva... ... Nota come il tuo corpo sa come camminare... Non devi controllare ogni movimento... Il tuo corpo ha la sua saggezza... Fidati di questa saggezza......",
        
        environmentAwareness: "Ora apri la tua consapevolezza all'ambiente intorno a te... Nota quello che vedi... non analizzando... ma semplicemente ricevendo... ... Senti l'aria sulla tua pelle... Ascolta i suoni intorno a te... Nota eventuali profumi... ... Sei parte di questo momento... di questo spazio... Stai camminando attraverso questo mondo... completamente presente... completamente vivo... ... Ogni passo ti connette più profondamente al qui e ora......",
        
        mindfulTurning: "Quando arrivi alla fine del tuo percorso... fermati... Stai in piedi per un momento... Senti la quietud dopo il movimento... ... Ora girati lentamente... Senti l'intero corpo che si gira... Il cambiamento di prospettiva... La vista diversa... ... Inizia a camminare nella direzione opposta... Ogni passo ancora fresco... ancora nuovo... ... Camminare consapevolmente trasforma l'ordinario in straordinario......",
        
        gratitude: "Mentre continui a camminare... porta gratitudine a questo corpo incredibile... Alle tue gambe che ti portano... Ai tuoi piedi che ti sostengono... Al tuo equilibrio che ti mantiene stabile... ... Senti gratitudine per la tua capacità di muoverti attraverso il mondo... Non tutti hanno questo dono... Ogni passo è un privilegio... ... Nota come la meditazione camminante crea un santuario in movimento... pace in movimento......",
        
        closing: "Vieni gradualmente a fermarti... Stai fermo per un momento... Senti i tuoi piedi saldamente a terra... Nota qualsiasi sensazione nel tuo corpo da questa camminata consapevole... ... Prenditi un momento per apprezzare che puoi portare questa qualità di consapevolezza a qualsiasi movimento... Camminare verso la tua auto... su per le scale... attraverso una stanza... ... Ogni passo può essere un'opportunità per la presenza... per il ritorno al qui e ora... Porta questa consapevolezza camminante con te nella tua giornata......"
      }
    ],

    breathing: [
      {
        name: "Pratica di Respirazione Completa",
        intro: "Benvenuto in questa meditazione di respirazione completa... Trova una posizione comoda seduta o sdraiata... Posa una mano sul tuo petto e una sul tuo ventre... Chiudi dolcemente gli occhi e inizia a notare il tuo respiro naturale... Non cambiare nulla... solo osserva come respiri in questo momento...",
        
        naturalBreath: "Iniziamo semplicemente osservando il tuo respiro naturale... Nota dove senti il respiro più chiaramente... Forse alle narici... forse nel petto... forse nel ventre... ... Segui il respiro che entra... e il respiro che esce... Ogni respiro è unico... ogni respiro è un dono... ... Non c'è bisogno di renderlo più profondo... o più lento... Semplicemente lascia che il respiro sia se stesso... mentre tu lo osservi con gentile curiosità......",
        
        deepBreathing: "Ora inizieremo a approfondire delicatamente il respiro... Inspira lentamente attraverso il naso... sentendo l'aria riempire prima il tuo ventre... poi il tuo petto... poi la parte superiore dei polmoni... ... Espira lentamente attraverso la bocca... sentendo l'aria uscire dalla parte superiore... poi dal petto... poi dal ventre... ... Questo è un respiro completo... un respiro che usa tutta la tua capacità polmonare... Ripeti questo respiro profondo... sentendoti più calmo ad ogni espirazione......",
        
        countedBreathing: "Ora aggiungeremo il conteggio per aiutare a concentrare la mente... Inspira contando lentamente fino a quattro... uno... due... tre... quattro... Trattieni dolcemente il respiro per due conteggi... uno... due... ... Espira contando fino a sei... uno... due... tre... quattro... cinque... sei... Questa espirazione più lunga attiva la risposta di rilassamento del corpo... ... Continua questo ritmo... Dentro per quattro... trattieni per due... fuori per sei... Trova il tuo proprio ritmo confortevole......",
        
        energizingBreath: "Ora proviamo una tecnica di respirazione energizzante... Prendi un respiro profondo... poi espira con tre piccoli respiri veloci attraverso la bocca... HU-HU-HU... ... Questo risveglia il tuo sistema nervoso e porta energia... Ancora una volta... inspira profondamente... espira HU-HU-HU... ... Senti l'energia che si muove attraverso il tuo corpo... Sei più vigile... più presente... più vivo... ... Torna al respiro naturale... Nota come ti senti ora......",
        
        calmingBreath: "Ora utilizzeremo il respiro per creare calma profonda... Inspira lentamente contando fino a cinque... uno... due... tre... quattro... cinque... ... Espira ancora più lentamente contando fino a otto... uno... due... tre... quattro... cinque... sei... sette... otto... ... Ogni espirazione ti porta più in profondità nel rilassamento... Ogni espirazione rilascia tensione e stress... ... Continua questo respiro calmante... Dentro per cinque... fuori per otto... Sentiti sprofondare in pace tranquilla......",
        
        breathAwareness: "Ora torna al tuo respiro naturale... Nota come si sente diverso dall'inizio... Forse più profondo... forse più calmo... forse più presente... ... Porta la tua consapevolezza alla pausa naturale tra l'inspirazione e l'espirazione... Quello spazio di quiete... quello momento di pace... ... Questo è il tuo rifugio... sempre disponibile... sempre con te... Il tuo respiro è il tuo maestro più fedele... sempre lì per guidarti al momento presente......",
        
        closing: "Mentre completiamo questa pratica di respirazione... Prenditi un momento per apprezzare questo dono incredibile del respiro... Ti mantiene vivo... ti connette al momento presente... ti porta pace... ... Inizia a muovere dolcemente le dita delle mani e dei piedi... Allunga le braccia se lo desideri... Fai un respiro profondo e completo... ... Quando sei pronto... apri lentamente gli occhi... Ricorda che il tuo respiro è sempre lì... il tuo compagno costante... il tuo sentiero verso la pace... Porta questa consapevolezza del respiro con te nella tua giornata......"
      }
    ],

    morning: [
      {
        name: "Pratica del Risveglio dell'Alba",
        intro: "Benvenuto in questa meditazione mattutina per iniziare la giornata... Mentre ti prepari per questo nuovo giorno... trova una posizione comoda seduta o sdraiata... Prenditi un momento per notare come ti senti... nel tuo corpo... nella tua mente... nel tuo cuore... ... Questo è un nuovo inizio... un'opportunità fresca... un dono di 24 ore davanti a te...",
        
        gentleAwakening: "Iniziamo risvegliando dolcemente il tuo corpo... Allunga le braccia sopra la testa... raggiungendo verso le tue possibilità più elevate... ... Ruota le spalle indietro... sentendo il tuo petto aprirsi al nuovo giorno... ... Fai un profondo sbadiglio se arriva... lasciando che il tuo corpo transiti dal sonno alla veglia... ... Muovi le dita delle mani e dei piedi... sentendo la forza vitale che scorre verso le tue estremità... Il tuo corpo è pronto per il giorno......",
        
        morningBreath: "Ora usiamo il respiro per costruire energia dolce... Inspira lentamente... immaginando di respirare l'energia fresca del mattino... Espira... rilasciando qualsiasi sonnolenza o stanchezza... ... Ad ogni respiro... sentiti diventare più vigile... più vivo... più presente... ... Immagina la luce del mattino... che tu possa vederla o no... riempiendo il tuo corpo di vitalità e chiarezza... ... Ogni inspirazione porta possibilità... ogni espirazione rilascia il passato......",
        
        gratitude: "Prendiamo un momento per la gratitudine mattutina... Pensa a tre cose per cui sei grato... ... Forse per questo nuovo giorno... per la tua salute... per le persone che ami... per le opportunità che hai... ... Senti questa gratitudine espandersi nel tuo petto... riempiendoti di calore... ... La gratitudine è come il sole... illumina tutto ciò che tocca... ... Lascia che questo apprezzamento riempia ogni cellula del tuo corpo... preparandoti a vedere la bellezza nel giorno che ti aspetta......",
        
        intentionSetting: "Ora poniamo un'intenzione per la tua giornata... Non una lista di cose da fare... ma una qualità dell'essere... ... Forse 'Scelgo di essere presente oggi'... ... O 'Scelgo di essere gentile con me stesso e con gli altri oggi'... ... O 'Scelgo di essere curioso e aperto oggi'... ... Senti questa intenzione nel tuo corpo... lascia che permei tutto il tuo essere... ... Questa intenzione sarà la tua guida... la tua bussola per il giorno che hai davanti......",
        
        energyVisualization: "Immagina una luce dorata brillante nel centro del tuo petto... Questa è la tua energia dell'alba... la tua vitalità naturale... ... Ad ogni respiro... questa luce diventa più brillante... più forte... ... Senti questa energia espandersi attraverso tutto il tuo corpo... verso l'alto attraverso il tuo petto... collo... testa... ... Verso il basso attraverso il tuo ventre... fianchi... gambe... fino alle dita dei piedi... ... Verso i lati attraverso le tue braccia... fino alle punte delle dita... ... Tutto il tuo corpo splende di questa energia dell'alba... pronto a brillare nel mondo......",
        
        affirmations: "Riempiamo la tua mente con affirmazioni positive per il mattino... 'Accolgo questo nuovo giorno con gioia'... ... 'Ho tutto ciò di cui ho bisogno dentro di me'... ... 'Questo giorno è pieno di possibilità'... ... 'Sono pronto ad abbracciare ciò che viene'... ... 'Irradio pace e positività'... ... Senti queste parole ancorarsi profondamente nella tua coscienza......",
        
        closing: "Mentre completiamo questa meditazione mattutina... prenditi un momento per apprezzare questo dono che hai dato a te stesso... ... Sentiti pronto ed energizzato per la tua giornata... centrato nella tua intenzione... riempito di gratitudine... ... Quando ti alzerai... porta questa energia consapevole con te... ... Ricorda... ogni mattino è una nuova opportunità... una pagina bianca... Cosa farai di questa bella giornata?... ... Alzati... brilla... e lascia che la tua luce tocchi il mondo......"
      }
    ]
  },

  // Portuguese meditation templates
  pt: {
    sleep: [
      {
        name: "Exploração Corporal para Dormir",
        intro: "Bem-vindo a esta meditação pacífica para dormir... Encontre uma posição confortável na sua cama... permita que o seu corpo se afunde no colchão... Feche os olhos suavemente e comece a notar a sua respiração... Não há nada que precise de fazer agora... exceto relaxar e ouvir a minha voz...",
        
        breathing: "Vamos começar com algumas respirações calmantes... Respire lentamente pelo nariz... conte até cinco... um... dois... três... quatro... cinco... Mantenha a respiração suavemente... um... dois... três... quatro... cinco... E agora expire lentamente pela boca... um... dois... três... quatro... cinco... Deixe que a sua respiração regresse ao seu ritmo natural... sentindo-se mais relaxado a cada respiração......",
        
        bodyRelaxation: "Agora vamos fazer uma suave exploração corporal para libertar qualquer tensão... Comece por levar a sua atenção aos seus pés... Sinta como eles se tornam pesados e quentes... Deixe essa pesadez fluir para cima pelos seus tornozelos... as suas panturrilhas... os seus joelhos... Sinta as suas pernas afundarem mais profundamente na cama... ... Agora leve a sua atenção às suas ancas e parte inferior das costas... Deixe-as amolecer e libertar... Sinta o seu ventre subir e descer a cada respiração... O seu peito expandindo suavemente... ... Leve a sua consciência aos seus ombros... Deixe-os cair longe dos seus ouvidos... Sinta o peso dos seus braços... pesados e relaxados... As suas mãos descansando pacificamente... ... Note o seu pescoço... Deixe-o alongar e amolecer... A sua mandíbula relaxa... O seu rosto torna-se pacífico... Até os pequenos músculos ao redor dos seus olhos se libertam......",
        
        visualization: "Imagine-se num lugar pacífico... Talvez esteja deitado numa nuvem suave... flutuando suavemente através de um céu estrelado... Ou talvez esteja descansando num belo jardim... rodeado pelo suave aroma de lavanda... O ar tem a temperatura perfeita... Sente-se completamente seguro e protegido... ... A cada respiração, deriva mais profundamente no relaxamento... A sua mente torna-se silenciosa e tranquila... como um lago calmo que reflete a lua... Qualquer pensamento que surja simplesmente flutua como nuvens... Não precisa de se agarrar a nada......",
        
        affirmations: "Enquanto descansa aqui em perfeita paz... saiba que... Está seguro... Está quente... Está protegido... É amado... ... O seu corpo sabe como dormir... É seguro deixar-se ir agora... Merece este descanso... Amanhã cuidará de si mesmo... ... Neste momento... neste agora... tudo está exatamente como deve estar......",
        
        closing: "Continue a descansar neste estado pacífico... O seu corpo está pesado e relaxado... A sua mente está calma e silenciosa... A cada respiração, afunda mais profundamente no sono reparador... ... Deixo-o agora para deslizar em sonhos pacíficos... Durma bem... Descanse profundamente... E acorde refrescado quando for a hora... Bons sonhos......"
      }
    ],

    stress: [
      {
        name: "Mindfulness para Alívio do Stress",
        intro: "Bem-vindo a esta meditação para alívio do stress... Encontre uma posição sentada confortável... as suas costas direitas mas não rígidas... Coloque os pés planos no chão... sinta o chão debaixo de si... Descanse as suas mãos suavemente nas suas coxas... E quando estiver pronto... feche os olhos ou baixe suavemente o olhar...",
        
        breathing: "Vamos começar tomando algumas respirações profundas e purificadoras... Respire pelo nariz... enchendo completamente os seus pulmões... E expire pela boca... libertando qualquer tensão... ... Mais uma vez... respire profundamente... sentindo o seu peito e ventre expandirem... E expire... deixando ir o stress e as preocupações... Mais uma vez... respire energia fresca e calmante... E expire tudo o que já não lhe serve......",
        
        bodyAwareness: "Agora leve a sua atenção ao seu corpo... Note qualquer área onde esteja a reter tensão... Talvez nos seus ombros... a sua mandíbula... o seu ventre... ... Sem tentar mudar nada... simplesmente note essas sensações... Reconheça-as com gentileza... ... Agora imagine respirar nessas áreas tensas... A cada inspiração... envie respiração e espaço para a tensão... A cada expiração... sinta a rigidez começar a amolecer... ... Continue esta respiração suave... dentro... criando espaço... fora... libertando tensão......",
        
        mindfulness: "Deixe que a sua atenção descanse no momento presente... Note a sensação da sua respiração entrando e saindo... O suave subir e descer do seu peito... ... Quando surgirem pensamentos sobre o seu dia... e vão surgir... simplesmente note-os sem julgamento... Como nuvens passando pelo céu... Deixe-os derivar... ... Regresse à sua respiração... Esta é a sua âncora... Sempre disponível... Sempre presente... ... Não há nada que precise de descobrir agora... Nenhum problema para resolver... Apenas esta respiração... depois a próxima......",
        
        visualization: "Imagine uma luz dourada e quente acima da sua cabeça... Esta é a luz da paz e da calma... A cada respiração... esta luz flui para baixo através do seu corpo... ... Flui através da sua cabeça... libertando tensão mental... Para baixo através do seu pescoço e ombros... derretendo o stress... Através do seu peito... acalmando o seu coração... Para baixo através dos seus braços até às pontas dos dedos... ... A luz dourada continua através do seu ventre... acalmando qualquer ansiedade... Para baixo através das suas ancas e pernas... aterrando-o... Até aos seus dedos dos pés... ... Está agora preenchido com esta luz dourada pacífica......",
        
        closing: "Enquanto nos preparamos para terminar esta meditação... Saiba que esta sensação de calma está sempre disponível para si... A apenas algumas respirações de distância... ... Comece a mover os seus dedos das mãos e dos pés... Role os seus ombros suavemente... E quando estiver pronto... abra lentamente os olhos... ... Tome um momento para notar como se sente... Leve esta paz consigo enquanto continua o seu dia... Lembre-se... pode sempre regressar a este centro calmo quando precisar... Obrigado por tomar este tempo para si......"
      }
    ],

    focus: [
      {
        name: "Concentração com Âncora Respiratória",
        intro: "Bem-vindo a esta meditação de concentração e foco... Sente-se confortavelmente com a sua coluna ereta e alerta... Descanse as suas mãos nos joelhos ou no colo... Tome um momento para estabelecer uma intenção de clareza e foco... Quando estiver pronto... feche suavemente os olhos...",
        
        breathing: "Comece tomando três respirações profundas e energizantes... Respire pelo nariz... enchendo os seus pulmões com ar fresco... E expire completamente pela boca... ... Mais uma vez... inspire profundamente... sentindo-se alerta e desperto... Expire completamente... libertando qualquer neblina mental... Mais uma vez... respire clareza... expire distração... ... Agora deixe que a sua respiração regresse ao normal... mas mantenha a sua atenção em cada respiração......",
        
        anchorPractice: "Vamos usar a sua respiração como âncora para a sua atenção... Concentre-se na sensação do ar entrando nas suas narinas... Fresco na inspiração... Quente na expiração... ... Mantenha a sua atenção mesmo na ponta do seu nariz... Onde sente primeiro a respiração... ... Quando a sua mente vaguear... e vai vaguear... simplesmente note para onde foi... Depois suavemente... sem julgamento... traga a sua atenção de volta à respiração... Esta é a prática... Notar... Regressar... Vez após vez......",
        
        affirmations: "Repita mentalmente estas afirmações para o foco... 'A minha mente está clara e aguçada'... ... 'Estou completamente presente e consciente'... ... 'A minha concentração é forte e estável'... ... 'Concentro-me com facilidade e clareza'... ... Deixe que estas palavras se afundem profundamente na sua consciência......",
        
        closing: "Enquanto completamos esta meditação... Sinta a clareza melhorada na sua mente... A sua capacidade melhorada de se concentrar... ... Comece a aprofundar a sua respiração... Mova os seus dedos das mãos e dos pés... E quando estiver pronto... abra os olhos... ... Note como se sente alerta e concentrado... A sua mente está clara... aguçada e pronta... Leve esta atenção focada para a sua próxima atividade... Está preparado para trabalhar com precisão e clareza......"
      }
    ],

    anxiety: [
      {
        name: "Aterramento para a Ansiedade",
        intro: "Bem-vindo a esta meditação para alívio da ansiedade... Encontre uma posição confortável onde se sinta apoiado e seguro... Pode colocar uma mão no seu coração e uma no seu ventre... Isto ajuda-o a sentir-se aterrado e conectado consigo mesmo... Tome um momento para chegar completamente aqui...",
        
        grounding: "Vamos começar aterrando-nos no momento presente... Sinta os seus pés no chão... ou o seu corpo na cadeira... Note cinco coisas que pode sentir agora... A temperatura do ar... A textura da sua roupa... O peso do seu corpo... ... Isto é real... Isto é agora... Está seguro neste momento......",
        
        breathing: "Agora vamos usar um padrão de respiração calmante... Respire lentamente durante quatro contagens... um... dois... três... quatro... Mantenha suavemente durante quatro... um... dois... três... quatro... E expire lentamente durante seis... um... dois... três... quatro... cinco... seis... ... Esta expiração mais longa ativa a resposta de relaxamento do seu corpo... Mais uma vez... dentro durante quatro... manter durante quatro... fora durante seis... ... Continue este ritmo calmante... sentindo-se mais calmo a cada ciclo......",
        
        affirmations: "Vamos oferecer-nos algumas afirmações calmantes... 'Estou seguro neste momento'... ... 'Este sentimento vai passar'... ... 'Sobrevivi à ansiedade antes e vou sobreviver novamente'... ... 'Sou mais forte que a minha ansiedade'... ... 'A paz é o meu estado natural'... ... 'Escolho a calma'......",
        
        closing: "Enquanto terminamos esta meditação... Lembre-se que tem sempre estas ferramentas disponíveis... A sua respiração... O seu lugar seguro... A sua força interior... ... Comece a mover suavemente o seu corpo... Talvez alongue-se um pouco... Tome uma respiração profunda e abra lentamente os olhos... ... Note qualquer mudança em como se sente... Mesmo uma pequena mudança é significativa... Seja gentil consigo mesmo enquanto regressa ao seu dia... É corajoso... É capaz... E não está sozinho......"
      }
    ],

    energy: [
      {
        name: "Energia do Sol Dourado",
        intro: "Bem-vindo a esta meditação energizante... Sente-se ou fique de pé numa posição que se sinta forte e alerta... Imagine uma corda puxando-o para cima do topo da sua cabeça... Sinta a sua coluna alongar... o seu peito abrir... Está prestes a despertar a sua vitalidade natural...",
        
        breathing: "Vamos começar com algumas respirações energizantes... Tome uma respiração profunda pelo nariz... enchendo todo o seu corpo com energia fresca... E expire vigorosamente pela boca com um som 'HA'... libertando qualquer fadiga... ... Mais uma vez... respire vitalidade e força vital... E expire 'HA'... deixando ir a preguiça... Mais uma vez... inspire poder e energia... Expire 'HA'... sentindo-se mais desperto......",
        
        energyVisualization: "Imagine um sol dourado brilhante no centro do seu peito... Esta é a sua fonte interior de energia... A cada respiração... este sol torna-se mais brilhante e maior... ... Sinta os seus raios quentes espalhando-se por todo o seu corpo... Para cima através do seu peito e ombros... Para baixo através dos seus braços até às pontas dos dedos... que formigam com energia... ... A luz dourada flui para cima através da sua garganta e cabeça... A sua mente torna-se clara e alerta... Para baixo através do seu ventre e ancas... Através das suas pernas... aterrando-o enquanto o energiza... ... Todo o seu corpo brilha com força vital vibrante......",
        
        affirmations: "Vamos ativar a sua energia com afirmações poderosas... 'Estou cheio de energia vibrante'... ... 'O meu corpo é forte e vivo'... ... 'Tenho toda a energia de que preciso para o meu dia'... ... 'Estou motivado e pronto para a ação'... ... 'A energia flui livremente através de mim'... ... Sinta estas palavras carregando cada célula do seu corpo......",
        
        closing: "Enquanto completamos esta meditação energizante... Sinta a vitalidade correndo pelas suas veias... Está desperto... alerta e completamente carregado... ... Comece a mover o seu corpo como se sente bem... Talvez estique os braços acima da cabeça... Role o pescoço... Salte suavemente nas pontas dos pés... ... Quando estiver pronto... abra os olhos bem abertos... Receba o mundo com energia fresca... Está pronto para abraçar o seu dia com entusiasmo e poder... Vá em frente e deixe a sua luz brilhar......"
      }
    ],

    mindfulness: [
      {
        name: "Consciência do Momento Presente",
        intro: "Bem-vindo a esta prática de mindfulness... Encontre uma posição confortável e estável... Permita que os seus olhos se fechem suavemente... Respire naturalmente... Está prestes a embarcar numa jornada de consciência plena... para descobrir a riqueza do momento presente...",
        
        breathing: "Vamos começar ancorando a nossa atenção na respiração... Não precisa de alterar o seu ritmo natural... apenas observe... Sinta a respiração entrar pelas narinas... talvez fresca ou ligeiramente fresca... ... Sinta a respiração sair... talvez mais quente... ... Quando a mente divagar... e irá divagar... simplesmente note 'pensando'... e traga gentilmente a sua atenção de volta à respiração... ... Não há julgamento... apenas um regresso gentil ao momento presente......",
        
        mindfulnessExercise: "Agora vamos expandir a nossa consciência... Mantenha a respiração como âncora... mas comece a notar os sons à sua volta... ... Talvez ouça sons distantes... sons próximos... Som do seu próprio corpo... ... Não precisa de identificar ou julgar estes sons... apenas deixe que existam no espaço da sua consciência... ... Agora note as sensações físicas... O contacto do seu corpo com a superfície onde está sentado... A temperatura do ar na sua pele... Talvez sensações de peso... leveza... tensão... relaxamento... ... Tudo é bem-vindo no momento presente......",
        
        thoughts: "Vamos praticar a consciência dos pensamentos... Imagine a sua mente como um céu vasto... Os pensamentos são como nuvens que passam... ... Quando notar um pensamento... simplesmente reconheça-o... 'Ah, um pensamento'... ... Não precisa de o seguir... não precisa de o combater... apenas observe-o passar... como uma nuvem no céu da sua consciência... ... Alguns pensamentos são grandes e dramáticos... outros são pequenos e subtis... Todos são temporários... todos passam... ... Você é o céu... não as nuvens... Você é a consciência que observa... não aquilo que é observado......",
        
        presentMoment: "Agora vamos aprofundar a nossa presença... Traga toda a sua atenção para este momento exato... ... Não há passado neste momento... não há futuro... apenas este respirar... este ouvir... este estar... ... Sinta a vida a pulsar através de si... A sua consciência brilhante e acordada... ... Este momento é um presente... por isso se chama 'presente'... Está completo exatamente como está... ... Você está completo exatamente como está......",
        
        closing: "Enquanto completamos esta prática de mindfulness... Leve consigo esta qualidade de presença... Pode aceder a esta consciência a qualquer momento... ... Basta pausar... respirar... e regressar ao agora... ... Comece a mover suavemente o seu corpo... Talvez os dedos das mãos e dos pés... ... Quando estiver pronto... abra os olhos... Traga esta consciência plena para o resto do seu dia... Cada momento é uma oportunidade para despertar......"
      }
    ],

    compassion: [
      {
        name: "Prática de Bondade Amorosa",
        intro: "Bem-vindo a esta prática de bondade amorosa... Encontre uma posição confortável... Permita que o seu coração se abra... Feche os olhos suavemente... Respire naturalmente... Está prestes a cultivar a qualidade mais bela da existência humana... a compaixão incondicional...",
        
        breathing: "Vamos começar criando espaço no coração... Respire para o centro do seu peito... Imagine cada respiração suavizando e expandindo o espaço em torno do seu coração... ... Sinta o peito expandir com cada inspiração... não apenas com ar... mas com bondade... ... Com cada expiração... liberte qualquer tensão... qualquer julgamento... qualquer dureza... ... Permita que o seu coração se torne espaçoso e caloroso... como uma lareira num dia frio de inverno......",
        
        selfCompassion: "Vamos começar oferecendo bondade a nós mesmos... Coloque a mão no coração se isso parecer natural... ... Imagine dirigir-se a si mesmo como faria a um amigo querido... Com a mesma gentileza... a mesma compreensão... ... Repita silenciosamente ou sussurre... 'Que eu seja feliz'... ... Sinta estas palavras no seu coração... não apenas na sua mente... 'Que eu seja feliz'... ... 'Que eu seja saudável'... ... 'Que eu viva com facilidade'... ... 'Que eu seja livre de sofrimento'... ... Se sentir resistência... está bem... Apenas note... e continue oferecendo bondade a si mesmo... Você merece amor... especialmente o seu próprio......",
        
        lovedOne: "Agora traga à mente alguém que ama facilmente... Talvez um familiar querido... um amigo próximo... até mesmo um animal de estimação... ... Veja o rosto desta pessoa... sinta o amor que tem por ela... ... Dirija estas palavras para ela... 'Que você seja feliz'... ... Sinta o calor destas palavras fluindo do seu coração para o deles... 'Que você seja saudável'... ... 'Que você viva com facilidade'... ... 'Que você seja livre de sofrimento'... ... Note como é natural desejar felicidade para alguém que ama......",
        
        neutralPerson: "Agora traga à mente uma pessoa neutra... Alguém que conhece mas por quem não sente nem amor especial nem desagrado... Talvez um vizinho... um funcionário de loja... alguém que vê regularmente... ... Veja se consegue estender a mesma bondade a esta pessoa... 'Que você seja feliz'... ... Mesmo que não sinta uma conexão profunda... pode oferecer boa vontade... 'Que você seja saudável'... ... 'Que você viva com facilidade'... ... 'Que você seja livre de sofrimento'... ... Esta pessoa também quer ser feliz... tal como você... tal como todos os seres......",
        
        difficultPerson: "Agora... se se sentir pronto... traga à mente alguém com quem tem dificuldades... Comece com alguém que só causa irritação ligeira... não a pessoa mais difícil da sua vida... ... Lembre-se... esta pessoa também já foi uma criança... também tem medos... também sente dor... ... Veja se consegue oferecer... mesmo que seja difícil... 'Que você seja feliz'... ... Se sentir resistência... está bem... Continue tentando... ou volte a si mesmo... 'Que você seja livre de sofrimento'... ... Lembre-se... desejar bem a alguém não significa concordar com as suas ações... É simplesmente reconhecer a nossa humanidade partilhada......",
        
        allBeings: "Agora vamos expandir a nossa bondade para todos os seres... Imagine ondas de compaixão irradiando do seu coração... ... Primeiro para todos na sua casa... no seu bairro... na sua cidade... ... Expandindo para toda a região... país... continente... ... Finalmente abraçando todo o planeta... todos os seres vivos... ... 'Que todos os seres sejam felizes'... ... 'Que todos os seres sejam saudáveis'... ... 'Que todos os seres vivam com facilidade'... ... 'Que todos os seres sejam livres de sofrimento'... ... Sinta-se conectado com toda a vida... parte da grande teia da existência......",
        
        closing: "Enquanto completamos esta prática de bondade amorosa... Sinta o seu coração expandido... mais espaçoso... mais compassivo... ... Esta bondade vive sempre dentro de si... Pode acedê-la a qualquer momento... especialmente quando enfrentar dificuldades... ... Comece a mover suavemente o seu corpo... Sinta a gratidão por ter praticado... ... Quando abrir os olhos... veja o mundo através dos olhos da compaixão... Lembre-se... a bondade que oferece aos outros... regressa sempre a si......"
      }
    ],

    walking: [
      {
        name: "Prática de Caminhada Consciente",
        intro: "Bem-vindo a esta meditação de caminhada consciente... Encontre-se de pé numa posição confortável... Sinta os seus pés em contacto com o solo... Permita que os olhos se fechem suavemente ou mantenham um olhar suave... Está prestes a transformar o simples ato de caminhar numa prática profunda de consciência...",
        
        standingAwareness: "Comecemos por tomar consciência da posição de pé... Sinta o peso do seu corpo distribuído pelos pés... Note a estabilidade... a forma como o solo o suporta... ... Sinta a ligação entre os seus pés e a terra... Esta é a sua base... a sua fundação... ... Deixe os braços caírem naturalmente ao lado do corpo... Ombros relaxados... Coluna direita mas não rígida... ... Respire naturalmente... Sinta-se enraizado... mas também leve... como uma árvore forte mas flexível......",
        
        liftingSteps: "Agora vamos começar a caminhar muito lentamente... Comece levantando o pé direito... Note a sensação de levantamento... o peso transferindo-se para o pé esquerdo... ... Levante... levante... levante... Sinta os músculos envolvidos... a mudança de equilíbrio... ... Agora mova o pé direito para a frente... movendo... movendo... movendo... Sinta o pé mover-se pelo espaço... ... Agora coloque o pé direito no solo... colocando... colocando... colocando... Sinta o contacto com o solo... o peso transferindo-se... ... Agora levante o pé esquerdo... levante... levante... levante... Continue este processo lento e consciente......",
        
        walkingRhythm: "Encontre um ritmo natural para a sua caminhada consciente... Não precisa de ser muito lento... apenas consciente... ... Sinta cada passo como uma oportunidade de presença... Levantando... movendo... colocando... ... Se estiver a caminhar numa linha reta... quando chegar ao fim... pare... vire-se conscientemente... e comece novamente... ... Ou se estiver a caminhar em círculo... sinta a curva contínua... a mudança sutil de direção... ... Deixe que cada passo seja uma meditação... cada movimento uma oração silenciosa......",
        
        bodyAwareness: "Enquanto caminha... expanda a sua consciência para todo o corpo... Sinta como os braços se movem naturalmente... balançando suavemente... ... Note como o tronco se ajusta subtilmente com cada passo... mantendo o equilíbrio... ... Sinta a cabeça equilibrada no topo da coluna... os olhos suaves... a respiração natural... ... Todo o corpo caminhando em harmonia... cada parte colaborando com as outras... ... Você não está apenas observando a caminhada... você é a caminhada... você é o movimento consciente......",
        
        mindfulSteps: "Se a mente divagar... e irá divagar... simplesmente note 'pensando'... e traga a atenção de volta aos pés... ... Cada passo é uma oportunidade de regressar ao presente... Cada contacto com o solo é uma nova oportunidade de consciência... ... Não há pressa... não há destino... apenas este passo... depois o próximo... depois o seguinte... ... Caminhe como se cada passo fosse sagrado... como se estivesse a pisar terra sagrada... porque está......",
        
        surroundings: "Se estiver a caminhar no exterior... note suavemente os sons à sua volta... Os pássaros... o vento... o tráfego distante... ... Sinta o ar na sua pele... a temperatura... talvez uma brisa suave... ... Se estiver no interior... note os sons da casa... a qualidade da luz... a textura do solo sob os seus pés... ... Permita que o ambiente faça parte da sua prática... não como distração... mas como parte da rica tapeçaria da consciência......",
        
        closing: "Enquanto completamos esta prática de caminhada consciente... Pare lentamente... Sinta novamente os dois pés firmemente no solo... ... Saiba que pode trazer esta qualidade de consciência para qualquer caminhada... ... Cada passo pode ser uma meditação... cada movimento uma oportunidade de presença... ... Comece a mover-se normalmente... mas mantenha um vestígio desta consciência... ... Quando abrir os olhos completamente... leve esta presença corporal para o resto do seu dia... Cada passo é uma oportunidade de despertar......"
      }
    ],

    breathing: [
      {
        name: "Prática de Respiração Completa",
        intro: "Bem-vindo a esta prática de respiração completa... Encontre uma posição confortável... seja sentado ou deitado... Permita que os olhos se fechem suavemente... Está prestes a explorar a respiração como uma porta para a calma profunda e vitalidade radiante...",
        
        naturalBreath: "Comecemos simplesmente observando a sua respiração natural... Sem tentar mudá-la... apenas observe... ... Sinta a respiração entrar... talvez pelas narinas... talvez ligeiramente fresca... ... Sinta a respiração sair... talvez mais quente... talvez mais suave... ... Note as pausas naturais... a pequena pausa após a inspiração... a pequena pausa após a expiração... ... Estas pausas são portais para a quietude... momentos de perfeita quietude......",
        
        deepBreathing: "Agora vamos aprofundar a respiração suavemente... Inspire lentamente pelo nariz... enchendo primeiro o abdómen... ... Sinta o ventre expandir suavemente... como um balão que se enche... ... Continue inspirando... enchendo o peito... as costelas expandindo... ... Finalmente... levante ligeiramente os ombros... enchendo completamente os pulmões... ... Pause por um momento... segurando esta respiração preciosa... ... Agora expire lentamente pela boca... primeiro dos ombros... depois do peito... finalmente do abdómen... ... Sinta todo o ar sair... deixando o corpo relaxado e solto......",
        
        countedBreath: "Vamos adicionar uma contagem suave para aprofundar a prática... Inspire lentamente contando até quatro... um... dois... três... quatro... ... Segure a respiração contando até quatro... um... dois... três... quatro... ... Expire lentamente contando até seis... um... dois... três... quatro... cinco... seis... ... Segure vazio contando até dois... um... dois... ... Continue com este ritmo... 4-4-6-2... Encontre o seu próprio ritmo natural... não force......",
        
        energizingBreath: "Agora vamos praticar uma respiração energizante... Mantenha a boca ligeiramente aberta... Inspire rapidamente pelo nariz... expire rapidamente pela boca... ... Como um cão a arfar... mas controlado... rápido mas não forçado... ... Continue por cerca de 30 segundos... se sentir tonturas... pare e respire normalmente... ... Isto desperta o sistema nervoso... energiza o corpo... clarifica a mente... ... Agora volte à respiração normal... sinta a energia vibrante no seu corpo......",
        
        calmingBreath: "Agora vamos praticar uma respiração calmante... Inspire pelo nariz contando até quatro... um... dois... três... quatro... ... Expire pelo nariz contando até oito... um... dois... três... quatro... cinco... seis... sete... oito... ... Esta expiração mais longa ativa o sistema nervoso parassimpático... promove profundo relaxamento... ... Continue com este ritmo... 4-8... 4-8... Sinta cada expiração longa levando-o mais profundamente na calma......",
        
        breathAwareness: "Agora simplesmente descanse na consciência da respiração... Sem controlar... sem contar... apenas estar presente com cada inspiração... cada expiração... ... Sinta a respiração como uma onda suave... fluindo para dentro... fluindo para fora... ... A respiração é vida... é energia... é a força vital que o conecta com toda a existência... ... Cada respiração é um presente... uma oportunidade de estar plenamente vivo... ... Descanse nesta consciência da respiração... deixe que ela o sustente... deixe que ela o alimente......",
        
        closing: "Enquanto completamos esta prática de respiração... Sinta a gratidão por este sistema incrível que o mantém vivo... ... A respiração está sempre consigo... sempre disponível como âncora... como fonte de calma... como fonte de energia... ... Comece a mover suavemente o corpo... Talvez estique os braços... role os ombros... ... Quando abrir os olhos... leve consigo esta consciência da respiração... Sempre que sentir stress ou cansaço... pode voltar à respiração... A respiração é o seu professor mais fiel......"
      }
    ],

    morning: [
      {
        name: "Prática do Despertar da Aurora",
        intro: "Bem-vindo a esta prática matinal de despertar... Encontre uma posição confortável... Permita que os olhos se fechem suavemente... Respire naturalmente... Está prestes a despertar não apenas o corpo... mas também a alma... para receber este novo dia como um presente sagrado...",
        
        awakening: "Comece notando que está vivo... que sobreviveu à noite... que tem um novo dia diante de si... ... Sinta a gratidão por ter acordado... por ter este corpo... por ter esta mente... por ter esta oportunidade de existir... ... Inspire profundamente... trazendo energia fresca para o seu ser... ... Expire... libertando qualquer sonolência... qualquer resistência ao despertar... ... Cada respiração é um convite para estar mais presente... mais acordado... mais vivo......",
        
        bodyActivation: "Vamos despertar suavemente o corpo... Comece movendo os dedos das mãos e dos pés... Sinta a vida fluir através das extremidades... ... Mova os pulsos em círculos... flexione os tornozelos... Desperte as articulações... ... Encolha os ombros até às orelhas... e deixe-os cair com um suspiro... 'Ahhhh'... ... Faça algumas rotações suaves com o pescoço... lado a lado... ... Sinta o corpo acordar... as células despertarem... a energia vital circular......",
        
        intention: "Agora vamos definir uma intenção para o dia... Pergunte-se... 'Como quero aparecer hoje?'... ... Talvez com mais paciência... mais alegria... mais compaixão... ... Talvez com mais presença... mais gratidão... mais coragem... ... Não precisa de ser perfeito... apenas uma intenção gentil... uma direção para o coração... ... Sinta esta intenção no seu peito... deixe-a irradiar através do seu ser... ... Esta intenção será a sua bússola interna ao longo do dia......",
        
        gratitude: "Vamos cultivar gratidão pelo dia que se aproxima... Traga à mente três coisas pelas quais se sente grato... ... Pode ser simples... o facto de ter uma cama confortável... uma chávena de café à espera... pessoas que o amam... ... Sinta a gratidão como uma sensação quente no peito... deixe-a expandir... ... Gratidão é o portal para a alegria... quando começamos o dia com gratidão... criamos a base para a felicidade... ... Deixe esta gratidão colorir a sua perspectiva... deixe que ela abra o seu coração......",
        
        energy: "Agora vamos despertar a energia vital... Inspire profundamente... imagine luz dourada entrando no seu corpo... ... Esta é a energia do sol... da vida... da possibilidade... ... Sinta esta luz dourada enchendo cada célula... cada órgão... cada músculo... ... Expire... deixando esta energia circular... ativando o seu sistema inteiro... ... Mais uma vez... inspire energia vital... expire vitalidade... ... Sinta-se energizado... mas também centrado... desperto... mas também calmo......",
        
        affirmations: "Vamos terminar com algumas afirmações poderosas para o dia... 'Estou grato por estar vivo'... ... 'Tenho tudo o que preciso para este dia'... ... 'Sou capaz de enfrentar qualquer desafio com graça'... ... 'Escolho ver beleza e bondade hoje'... ... 'Sou uma fonte de luz e amor no mundo'... ... Sinta estas palavras como verdades... não apenas pensamentos... deixe que elas se tornem a sua realidade......",
        
        closing: "Enquanto completamos esta prática matinal... Sinta-se desperto... energizado... e pronto para abraçar o dia... ... Leve consigo esta sensação de gratidão... esta clareza de intenção... esta energia vital... ... Comece a mover-se mais ativamente... talvez espreguice... talvez sorria... ... Quando abrir os olhos... veja o mundo com olhos frescos... como se fosse a primeira vez... ... Este é um dia novo... cheio de possibilidades... e você está pronto para dançar com ele... Vá em frente e faça deste dia uma obra-prima......"
      }
    ]
  },

  ru: {
    sleep: [
    {
      name: "Сканирование тела перед сном",
      intro: "Добро пожаловать на эту медитацию для глубокого сна... Устройтесь удобно в кровати, позвольте своему телу полностью расслабиться на матрасе... Мягко закройте глаза и начните замечать своё дыхание... Сейчас вам не нужно ничего делать, просто расслабьтесь и слушайте мой голос...",
      
      breathing: "Давайте начнём с успокаивающих вдохов... Медленно вдохните через нос на счёт пять... раз... два... три... четыре... пять... Мягко задержите дыхание на пять... раз... два... три... четыре... пять... А теперь медленно выдохните через рот на пять... раз... два... три... четыре... пять... Позвольте дыханию вернуться к естественному ритму... чувствуя больше расслабления с каждым вдохом......",
      
      bodyRelaxation: "Теперь мы проведём мягкое сканирование тела, чтобы снять любое напряжение... Начните с того, что обратите внимание на свои стопы... Почувствуйте, как они становятся тяжёлыми и тёплыми... Позвольте этой тяжести подниматься через лодыжки... икры... колени... Почувствуйте, как ноги глубже погружаются в кровать... ... Теперь обратите внимание на бёдра и поясницу... Позвольте им смягчиться и расслабиться... Почувствуйте, как живот поднимается и опускается с каждым вдохом... Грудь мягко расширяется... ... Обратите внимание на плечи... Позвольте им опуститься от ушей... Почувствуйте тяжесть рук... тяжёлых и расслабленных... Руки мирно покоятся... ... Обратите внимание на шею... Позвольте ей удлиниться и смягчиться... Челюсть расслабляется... Лицо расслабляется... Даже крошечные мышцы вокруг глаз отпускаются......",
      
      visualization: "Представьте себя в мирном месте... Возможно, вы лежите на мягком облаке... мягко плывёте по звёздному небу... Или, может быть, вы отдыхаете в прекрасном саду... окружённые нежным ароматом лаванды... Температура воздуха идеальна... Вы чувствуете себя в полной безопасности и защищённости... ... С каждым вдохом вы погружаетесь глубже в расслабление... Ваш ум становится тихим и спокойным... как спокойное озеро, отражающее луну... Любые мысли, которые возникают, просто уплывают как облака... Нет необходимости за что-то держаться......",
      
      affirmations: "Пока вы покоитесь здесь в совершенном покое, знайте что... Вы в безопасности... Вам тепло... Вы защищены... Вас любят... ... Ваше тело знает, как спать... Теперь можно отпустить всё... Вы заслуживаете этого отдыха... Завтра позаботится о себе само... ... Прямо сейчас, в этот момент, всё именно так, как должно быть......",
      
      closing: "Продолжайте отдыхать в этом мирном состоянии... Ваше тело тяжёлое и расслабленное... Ваш ум спокойный и тихий... С каждым вдохом вы погружаетесь глубже в спокойный сон... ... Теперь я оставлю вас погружаться в мирные сны... Спите хорошо... Отдыхайте глубоко... И просыпайтесь отдохнувшими, когда придёт время... Сладких снов......"
    },
    
    {
      name: "Морские волны для сна",
      intro: "Добро пожаловать на эту успокаивающую морскую медитацию для сна... Устройтесь удобно в кровати и сделайтесь максимально комфортно... Закройте глаза и представьте, что вы лежите на прекрасном пляже на закате... Звук нежных волн будет направлять вас к мирному сну...",
      
      breathing: "Начните с глубокого дыхания... Вдохните свежий морской воздух... почувствуйте, как он полностью наполняет лёгкие... Медленно выдохните... освобождаясь от всего напряжения дня... ... Слушайте ритм волн... Вдох... и выдох... Вдох... и выдох... Позвольте своему дыханию соответствовать этому естественному ритму... Каждый вдох уводит вас глубже в расслабление......",
      
      oceanVisualization: "Представьте себя лежащим на тёплом мягком песке... Солнце садится, окрашивая небо в прекрасные цвета... Вы слышите нежный звук волн, накатывающих на берег... Каждая волна уносит ваши заботы и стресс... ... Почувствуйте тёплый песок, поддерживающий ваше тело... Нежный морской бриз ласкает вашу кожу... Здесь вы в полной безопасности и покое... ... С каждой накатывающей волной вы чувствуете большую сонливость... больше расслабления... Океан поёт вам колыбельную......",
      
      bodyRelaxation: "Теперь позвольте волнам омыть ваше тело... Начиная со стоп... Почувствуйте, как они становятся тяжёлыми как мокрый песок... Волны поднимаются по ногам... делая их полностью расслабленными и тяжёлыми... ... Нежная вода течёт по бёдрам и пояснице... Всё напряжение тает как песок, разглаженный приливом... Руки мирно плывут... тяжёлые и расслабленные... ... Почувствуйте волны, омывающие грудь... плечи... шею... Лицо становится мягким и мирным... полностью расслабленным......",
      
      affirmations: "С каждой волной вы знаете... Вы в безопасности и защищены... Океан мягко держит вас... Вы в совершенном покое... ... Ваше тело готово к глубокому восстановительному сну... Волны уносят все ваши заботы... Завтра принесёт новые возможности... ... Прямо сейчас есть только покой... только отдых... только нежный звук волн......",
      
      closing: "Продолжайте отдыхать здесь на этом мирном пляже... Волны продолжают свой нежный ритм... убаюкивая вас... ... Позвольте звуку океана унести вас в прекрасные сны... Спите глубоко... Отдыхайте полностью... И просыпайтесь свежими как рассвет над океаном... Сладких снов......"
    }
  ],

  stress: [
    {
      name: "Осознанное снятие стресса",
      intro: "Добро пожаловать на эту медитацию для снятия стресса... Найдите удобное положение сидя, держа спину прямо, но не напряжённо... Поставьте стопы на пол, чувствуя землю под ними... Мягко положите руки на колени... И когда будете готовы, закройте глаза или мягко направьте взгляд вниз...",
      
      breathing: "Давайте начнём с нескольких глубоких очищающих вдохов... Вдохните через нос, полностью наполняя лёгкие... И выдохните через рот, освобождаясь от любого напряжения... ... Снова вдохните глубоко... чувствуя расширение груди и живота... И выдохните... отпуская стресс и беспокойство... Ещё раз... вдохните свежую успокаивающую энергию... И выдохните всё, что больше не служит вам......",
      
      stressAcknowledgment: "Сейчас мягко признайте любой стресс или напряжение, которое вы несёте... Не судите себя за эти ощущения... просто заметьте их с добротой... Стресс естественен... это способ тела реагировать на вызовы... ... Представьте этот стресс как облако в небе вашего ума... Облака приходят и уходят... они не являются небом... Вы - небо... обширное, открытое и мирное......",
      
      breathingFocus: "Теперь обратите мягкое внимание на своё дыхание... Заметьте естественный поток вдоха и выдоха... Каждый вдох приносит спокойствие и ясность... Каждый выдох освобождает напряжение и стресс... ... Если ум отвлекается на беспокойства, мягко верните внимание к дыханию... Это ваш якорь... ваше безопасное место в настоящем моменте......",
      
      bodyRelease: "Просканируйте своё тело от макушки до пальцев ног... Заметьте любые области напряжения или стеснения... Направьте дыхание в эти области... представляя, как напряжение растворяется с каждым выдохом... ... Особое внимание уделите плечам... часто здесь держится стресс... Позвольте им опуститься от ушей... мягко расслабиться... Почувствуйте освобождение......",
      
      affirmations: "Пока вы дышите в этом спокойном ритме, мягко повторяйте... Я спокоен... Я в безопасности... Этот момент проходит... У меня есть всё необходимое... ... Я выбираю мир вместо стресса... Я выбираю ясность вместо хаоса... Я выбираю присутствие вместо беспокойства... ... Каждый вдох приносит мне силу... Каждый выдох освобождает то, что мне не нужно......",
      
      closing: "Продолжайте сидеть в этом мирном состоянии... Дыхание естественное и спокойное... Тело расслабленное и мягкое... ... Унесите это чувство спокойствия с собой в день... Помните, что можете вернуться к этому дыханию в любое время... Это ваш источник мира... всегда доступный вам... Мягко откройте глаза, когда будете готовы......"
    }
  ],

  focus: [
    {
      name: "Медитация концентрации",
      intro: "Добро пожаловать на эту медитацию для улучшения фокуса и концентрации... Сядьте удобно с прямой спиной... Поставьте ноги на пол и расслабьте плечи... Положите руки удобно на колени... Когда будете готовы, мягко закройте глаза...",
      
      breathing: "Начните с установления ритма дыхания... Вдохните на четыре счёта... раз... два... три... четыре... Задержите на два... раз... два... Выдохните на четыре... раз... два... три... четыре... ... Продолжайте этот ритм... позволяя уму настроиться на эту простую практику... Дыхание становится вашей точкой фокуса......",
      
      mindTraining: "Ум естественно блуждает... это нормально... Когда заметите, что мысли отвлеклись, мягко и без суда верните внимание к дыханию... Это как тренировка мышцы внимания... ... Каждый раз, когда вы возвращаете фокус, вы укрепляете способность к концентрации... Это не неудача, когда ум отвлекается... это возможность для тренировки......",
      
      singlePointFocus: "Теперь выберите одну точку фокуса... Это может быть ощущение дыхания у носа... или подъём и опускание живота... или звук дыхания... ... Направьте всё внимание на эту точку... Когда ум отвлекается на другие мысли, звуки или ощущения, мягко верните его к выбранной точке... ... Это практика однонаправленного внимания... основа всех форм концентрации......",
      
      concentration: "Почувствуйте, как ум становится более сосредоточенным... более ясным... Заметьте качество внимания... когда оно однонаправленно, появляется естественная лёгкость и спокойствие... ... Эта способность к фокусу, которую вы развиваете здесь, переносится на все аспекты жизни... работу, отношения, творчество... ... Каждый момент присутствия укрепляет вашу способность оставаться сосредоточенным......",
      
      affirmations: "Пока продолжаете дышать с фокусом... знайте, что... Мой ум ясный и сосредоточенный... Я могу направлять своё внимание по выбору... Я присутствую в этом моменте... ... Концентрация - это навык, который я развиваю... С каждой практикой я становлюсь более фокусированным... У меня есть сила направлять свой ум......",
      
      closing: "Медленно расширьте осознание от точки фокуса... Включите звуки комнаты... ощущение тела на стуле... ... Унесите это качество ясного, сосредоточенного внимания в день... Помните, что можете вернуться к дыханию для центрирования в любое время... ... Когда будете готовы, мягко откройте глаза... чувствуя себя ясным, сосредоточенным и присутствующим......"
    }
  ],

  anxiety: [
    {
      name: "Успокоение тревоги",
      intro: "Добро пожаловать на эту медитацию для работы с тревогой... Найдите безопасное, удобное место для сидения... Поставьте ноги на пол, чувствуя поддержку земли... Положите одну руку на сердце, другую на живот... Закройте глаза или мягко опустите взгляд...",
      
      grounding: "Начнём с заземления в настоящем моменте... Почувствуйте точки соприкосновения вашего тела со стулом... ноги на полу... руки на теле... ... Вы здесь... вы в безопасности... в этот момент всё в порядке... Сделайте несколько глубоких вдохов, напоминая себе: 'Я здесь, я в безопасности'......",
      
      breathingForAnxiety: "Теперь будем работать с дыханием для успокоения нервной системы... Вдохните медленно на четыре счёта... раз... два... три... четыре... Задержите на четыре... раз... два... три... четыре... Выдохните медленно на шесть... раз... два... три... четыре... пять... шесть... ... Длинный выдох активирует парасимпатическую нервную систему... систему 'отдыха и восстановления'... Продолжайте этот ритм......",
      
      anxietyAcknowledgment: "Мягко признайте любую тревогу, которая присутствует... Не пытайтесь её прогнать... просто заметьте с состраданием... Тревога часто пытается защитить нас... поблагодарите её за попытку заботы... ... Скажите тревоге: 'Спасибо за заботу... прямо сейчас я в безопасности... прямо сейчас всё в порядке'... ... Представьте тревогу как волну... волны поднимаются и опускаются... они не длятся вечно......",
      
      bodyCalming: "Направьте внимание на области тела, где чувствуется тревога... Возможно, это грудь, живот или горло... Дышите мягко в эти области... ... Представьте тёплый золотой свет, входящий в эти места с каждым вдохом... Свет приносит спокойствие и исцеление... С каждым выдохом напряжение и тревога растворяются......",
      
      affirmations: "Пока продолжаете дышать в успокаивающем ритме... мягко повторяйте... Этот момент пройдёт... У меня есть всё необходимое для этого... Я сильнее своей тревоги... ... Я выбираю мир... Я выбираю спокойствие... Я выбираю доверие жизни... Каждый вдох приносит мне покой... Каждый выдох освобождает страх......",
      
      closing: "Продолжайте сидеть в этом спокойном состоянии... Дыхание медленное и глубокое... Тело более расслабленное... Ум более мирный... ... Помните, что эти инструменты всегда с вами... Возвращайтесь к дыханию, когда нужно успокоиться... Вы сильнее, чем думаете... ... Когда будете готовы, мягко откройте глаза... неся это спокойствие с собой......"
    }
  ],

  energy: [
    {
      name: "Утренняя энергизирующая медитация",
      intro: "Добро пожаловать на эту энергизирующую медитацию... Сядьте прямо с открытой грудью и поднятой головой... Поставьте ноги твёрдо на пол... Положите руки на колени ладонями вверх... Закройте глаза и почувствуйте готовность получить энергию...",
      
      energizingBreath: "Начнём с дыхания, которое пробуждает энергию... Сделайте глубокий вдох через нос, наполняя живот... Затем быстрый сильный выдох через рот... Повторите три раза... ... Теперь вернитесь к естественному дыханию... Заметьте, как тело уже чувствует больше бодрости... больше жизненности......",
      
      bodyActivation: "Представьте яркий золотой свет в центре груди... Это ваш внутренний источник энергии... С каждым вдохом свет становится ярче... сильнее... ... Теперь направьте этот свет вниз по позвоночнику... заряжая каждый позвонок... Почувствуйте, как энергия распространяется в ноги... давая вам основу силы... ... Направьте свет вверх через шею в голову... пробуждая ясность ума... Затем вниз по рукам... наполняя их силой для действий......",
      
      vitality: "Почувствуйте эту жизненную энергию, циркулирующую по всему телу... Это ваша естественная сила... ваша врождённая витальность... Она всегда доступна вам... ... Представьте, как эта энергия излучается из вашего тела... создавая светящуюся ауру силы и уверенности... Вы чувствуете себя живым... бодрым... готовым к дню......",
      
      intention: "Теперь установите намерение для дня... Как вы хотите использовать эту энергию?... Какие цели важны для вас?... Почувствуйте мотивацию и энтузиазм, поднимающиеся изнутри... ... Визуализируйте себя, проживающим день с этой энергией... решающим задачи с лёгкостью... взаимодействующим с другими из места силы и радости......",
      
      affirmations: "Пока энергия продолжает циркулировать... повторяйте с убеждением... Я полон жизненной силы... У меня есть энергия для всего важного... Я подхожу к дню с энтузиазмом... ... Моё тело сильное и здоровое... Мой ум ясный и сосредоточенный... Моё сердце открыто возможностям... Я излучаю позитивную энергию......",
      
      closing: "Медленно начните двигать пальцами рук и ног... Осторожно поверните головой из стороны в сторону... Потянитесь к небу... ... Откройте глаза и почувствуйте себя полностью пробуждённым... энергичным... готовым к дню... Унесите эту энергию с собой... возвращайтесь к ней, когда нужна мотивация... У вас есть всё необходимое для замечательного дня......"
    }
  ],

  mindfulness: [
    {
      name: "Осознанность Настоящего Момента",
      intro: "Добро пожаловать на эту практику осознанности... Найдите удобное положение сидя, держа спину прямо и расслабленно... Поставьте ноги на пол, почувствуйте связь с землёй... Положите руки удобно на колени... Мягко закройте глаза и вернитесь в настоящий момент...",
      
      breathing: "Начните с того, что просто заметьте своё дыхание... Не пытайтесь изменить его... просто наблюдайте... Почувствуйте, как воздух входит через нос... как живот мягко поднимается... как воздух выходит... живот опускается... ... Если ум отвлекается, это нормально... мягко верните внимание к дыханию... Каждый возврат к дыханию - это момент пробуждения... момент осознанности......",
      
      presentMoment: "Теперь расширьте осознание на весь момент... Заметьте звуки вокруг вас... не называя их, просто слушая... Почувствуйте тело на стуле... температуру воздуха на коже... ... Это и есть настоящий момент... Не прошлое с его воспоминаниями... не будущее с его планами... а именно это... прямо сейчас... Здесь нет ничего, что нужно исправить... нет места, куда нужно идти... просто это......",
      
      awareness: "Заметьте качество своего осознания... Это открытое пространство, в котором возникают все переживания... мысли... чувства... ощущения... звуки... ... Вы не эти переживания... вы осознание, которое их наблюдает... Как небо наблюдает облака... осознание наблюдает все явления... с полным принятием... ... Заметьте, как в этом пространстве осознания есть естественная мудрость... естественный покой......",
      
      thoughts: "Теперь мягко обратите внимание на мысли... Заметьте, как они появляются в пространстве осознания... остаются некоторое время... затем растворяются... ... Не судите мысли... не анализируйте их... просто наблюдайте их приход и уход... Заметьте, что между мыслями есть промежутки... моменты тишины... ... Это естественные паузы в уме... пространство покоя, которое всегда доступно......",
      
      affirmations: "Покоясь в этом осознанном присутствии... знайте, что... Я полностью здесь... Я принимаю этот момент таким, какой он есть... Я нахожу мир в настоящем... ... Моё осознание безграничное и свободное... Я доверяю мудрости момента... Всё, что мне нужно, находится здесь и сейчас... ... Каждый момент осознанности - это дар... Я благодарен за способность присутствовать......",
      
      closing: "Мягко начните возвращаться... Почувствуйте тело в пространстве... звуки комнаты... Сохраните это качество присутствия... эту осознанность... ... Помните, что настоящий момент всегда доступен... в любое время можно вернуться к дыханию... к осознанности... ... Когда будете готовы, откройте глаза... неся это присутствие в свой день... Пусть каждый момент станет возможностью для осознанности......"
    }
  ],

  compassion: [
    {
      name: "Практика Любящей Доброты",
      intro: "Добро пожаловать на эту практику развития сострадания и любящей доброты... Сядьте удобно, позвольте телу расслабиться... Положите руку на сердце, почувствуйте его мягкое биение... Закройте глаза и обратитесь к сердечному центру... месту любви и доброты внутри вас...",
      
      selfCompassion: "Начнём с развития доброты к себе... Представьте себя сидящим здесь... со всеми своими достоинствами и недостатками... Мягко направьте к себе пожелания... ... Пусть я буду счастлив... Пусть я буду здоров... Пусть я буду в безопасности... Пусть я буду в мире... ... Почувствуйте, как эти пожелания исходят из сердца... Если есть сопротивление, это нормально... мягко продолжайте... Вы достойны любви... вы достойны доброты......",
      
      lovedOnes: "Теперь представьте дорогого вам человека... Увидьте его лицо... почувствуйте связь с ним... Направьте к нему те же пожелания... ... Пусть ты будешь счастлив... Пусть ты будешь здоров... Пусть ты будешь в безопасности... Пусть ты будешь в мире... ... Почувствуйте, как ваше сердце открывается... как любовь естественно течёт к этому человеку... Заметьте радость в даривании любви......",
      
      neutralPerson: "Теперь подумайте о нейтральном человеке... Возможно, кто-то, кого вы видели сегодня, но не знаете хорошо... Представьте, что у него есть такие же надежды и страхи, как у вас... ... Мягко предложите ему те же пожелания... Пусть ты будешь счастлив... Пусть ты будешь здоров... Пусть ты будешь в безопасности... Пусть ты будешь в мире... ... Заметьте, как сердце способно расширяться... включать даже незнакомых людей в круг заботы......",
      
      difficultPerson: "Теперь, если готовы, подумайте о ком-то, с кем у вас сложные отношения... Начните с малого... не обязательно с самым трудным человеком... Помните, что он тоже хочет быть счастливым... хочет избежать страданий... ... Мягко, без принуждения, предложите... Пусть ты будешь счастлив... Пусть ты будешь здоров... Пусть ты будешь в безопасности... Пусть ты будешь в мире... ... Это не означает оправдания действий... это освобождение своего сердца от тяжести......",
      
      allBeings: "Теперь расширьте сердце на всех живых существ... Представьте волны любящей доброты, исходящие из вашего сердца... Ко всем людям в вашем городе... стране... мире... ... Пусть все существа будут счастливы... Пусть все существа будут здоровы... Пусть все существа будут в безопасности... Пусть все существа будут в мире... ... Почувствуйте безграничность сердца... его способность любить без условий... без ограничений......",
      
      affirmations: "Покоясь в этом океане любящей доброты... знайте, что... Моё сердце - источник бесконечной любви... Я связан со всеми живыми существами... Сострадание - моя истинная природа... ... Любовь, которую я дарю, возвращается ко мне... Я исцеляю мир через любовь... Каждый акт доброты имеет значение... ... Я выбираю любовь вместо страха... доброту вместо суда... понимание вместо осуждения......",
      
      closing: "Мягко верните руки на колени... Почувствуйте тепло в груди... это сияние любящего сердца... ... Унесите эту доброту с собой... Пусть она направляет ваши слова и действия... Помните, что каждый человек, которого вы встречаете, хочет быть счастливым... ... Когда будете готовы, откройте глаза... видя мир глазами сострадания... готовые дарить любовь, где бы вы ни были......"
    }
  ],

  walking: [
    {
      name: "Практика Осознанной Ходьбы",
      intro: "Добро пожаловать на эту практику осознанной ходьбы... Найдите тихое место для медленной ходьбы... Это может быть комната, коридор или тихая дорожка... Встаньте прямо, почувствуйте связь ступней с землёй... Позвольте рукам свободно висеть по бокам...",
      
      grounding: "Начните с того, что просто стойте... Почувствуйте вес тела... как он распределяется через ступни на землю... Заметьте ощущение устойчивости... укоренённости... ... Сделайте несколько естественных вдохов... Почувствуйте тело в пространстве... высоту... ширину... присутствие... Это ваша отправная точка... место покоя перед началом движения......",
      
      intention: "Установите намерение для этой ходьбы... Это не ходьба, чтобы куда-то попасть... это ходьба ради самой ходьбы... ради присутствия... ради осознанности... ... Пусть каждый шаг будет медитацией... каждое движение - актом осознанности... Нет спешки... нет цели, кроме полного присутствия в каждом моменте......",
      
      firstSteps: "Начните с поднятия правой ноги... Делайте это очень медленно... осознанно... Почувствуйте, как вес переносится на левую ногу... как правая нога поднимается... движется вперёд... ... Медленно поставьте правую ногу... Почувствуйте контакт с землёй... перенос веса... Теперь левая нога... поднимается... движется... опускается... ... Каждый шаг - это отдельная медитация... отдельный момент полного присутствия......",
      
      walkingRhythm: "Найдите свой естественный ритм... Возможно, это три-четыре шага на вдох... три-четыре на выдох... Или просто позвольте дыханию течь естественно, пока идёте... ... Заметьте ощущения в ступнях... в ногах... в теле... качание рук... движение одежды... Всё это - часть танца осознанной ходьбы... ... Если ум отвлекается, мягко верните внимание к ступням... к земле... к этому шагу... именно к этому шагу......",
      
      environment: "Теперь расширьте осознание на окружающее... Заметьте звуки... не называя их, просто слушая... Почувствуйте воздух на коже... температуру... любые ароматы... ... Если идёте на улице, заметьте небо... деревья... землю под ногами... Если в помещении, почувствуйте пространство... стены... свет... Всё это - часть медитации... часть настоящего момента... ... Идите, как если бы касались земли благословением... как если бы каждый шаг был молитвой......",
      
      difficulties: "Если возникает беспокойство или нетерпение, остановитесь... Просто стойте и дышите... Заметьте эти чувства без суда... ... Помните, что цель не в том, чтобы чувствовать себя определённым образом... цель - присутствовать с тем, что есть... ... Когда будете готовы, продолжайте... Может быть, ещё медленнее... ещё более осознанно... Пусть каждый шаг учит вас терпению... присутствию... принятию......",
      
      affirmations: "Продолжая эту священную ходьбу... знайте, что... Каждый шаг - это возможность для осознанности... Я иду в мире с землёй и собой... Настоящий момент - мой дом... ... Мои ступни благословляют землю... Земля поддерживает меня... Я часть великого танца жизни... ... В каждом шаге есть мудрость... В каждом дыхании есть покой... Я иду по пути осознанности......",
      
      closing: "Медленно остановитесь... Встаньте неподвижно... Почувствуйте устойчивость... присутствие... Заметьте, как тело ощущается после этой осознанной ходьбы... ... Сделайте несколько глубоких вдохов... Поблагодарите землю за поддержку... ноги за то, что несли вас... ... Унесите это качество осознанности в обычную ходьбу... Помните, что каждый шаг может быть медитацией... каждое движение - возможностью для присутствия... Пусть весь мир станет вашим местом практики......"
    }
  ],

  breathing: [
    {
      name: "Практика Полного Дыхания",
      intro: "Добро пожаловать на эту практику глубокого, полного дыхания... Найдите удобное положение сидя или лёжа... Убедитесь, что позвоночник прямой... Положите одну руку на грудь, другую на живот... Закройте глаза и обратитесь к естественному дыханию...",
      
      naturalBreath: "Начните с наблюдения за своим естественным дыханием... Не пытайтесь его менять... просто заметьте... Какая рука больше движется?... Где вы чувствуете дыхание наиболее отчётливо?... ... Большинство людей дышат в основном грудью... Но есть более глубокий, более питательный способ дыхания... дыхание, которое использует всю ёмкость лёгких... ... Это дыхание, которое успокаивает нервную систему... которое приносит больше кислорода в тело... больше жизненной силы......",
      
      bellyBreathing: "Теперь мягко направьте дыхание в живот... Представьте, что у вас есть воздушный шарик в животе... На вдохе шарик мягко надувается... рука на животе поднимается... ... На выдохе шарик сдувается... рука на животе опускается... Рука на груди остаётся относительно неподвижной... ... Это может показаться странным сначала... это нормально... Мягко практикуйте... позвольте телу вспомнить этот естественный способ дыхания......",
      
      fullBreath: "Теперь перейдём к полному дыханию... Начните с выдоха... полностью освободите лёгкие... Затем медленно вдохните... ... Сначала наполните живот... чувствуя, как он мягко расширяется... Затем позвольте дыханию подняться в грудь... расширяя рёбра... ... Наконец, почувствуйте, как дыхание поднимается к ключицам... наполняя верхнюю часть лёгких... ... Теперь медленно выдохните в обратном порядке... Сначала из верхней части лёгких... затем из груди... наконец, из живота... полностью освобождая воздух......",
      
      breathingRhythm: "Давайте установим ритм... Вдохните на четыре счёта... наполняя живот... рёбра... верхнюю часть лёгких... раз... два... три... четыре... ... Задержите дыхание на два счёта... раз... два... ... Выдохните на шесть счётов... медленно освобождая воздух... раз... два... три... четыре... пять... шесть... ... Продолжайте этот ритм... 4-2-6... позвольте ему стать естественным... медитативным......",
      
      breathingEffects: "Заметьте, как это дыхание влияет на ваше тело... на ум... Полное дыхание массирует внутренние органы... стимулирует парасимпатическую нервную систему... ... Это дыхание говорит телу: 'Ты в безопасности... можешь расслабиться'... Это естественный способ снизить стресс... увеличить ясность ума... ... Каждый полный вдох приносит больше жизненной силы... каждый долгий выдох освобождает напряжение... токсины... всё, что больше не нужно......",
      
      breathingMeditation: "Теперь просто дышите... Позвольте дыханию стать якорем для присутствия... Если ум отвлекается, мягко верните внимание к дыханию... к животу... к рёбрам... к верхней части лёгких... ... Каждый цикл дыхания - это маленькая жизнь... рождение на вдохе... смерть на выдохе... и возрождение с следующим вдохом... ... Доверьтесь дыханию... оно знает, что делать... оно поддерживало вас всю жизнь... и будет поддерживать......",
      
      affirmations: "Продолжая эту практику дыхания... знайте, что... Каждый вдох наполняет меня жизненной силой... Каждый выдох освобождает меня от стресса... Дыхание - мой мост к покою... ... Я дышу в гармонии с жизнью... Моё дыхание исцеляет и обновляет... Я доверяю мудрости своего тела... ... С каждым дыханием я становлюсь более присутствующим... более спокойным... более живым......",
      
      closing: "Мягко позвольте дыханию вернуться к естественному ритму... Уберите руки с груди и живота... Но сохраните осознание более глубокого дыхания... ... Помните, что это дыхание всегда доступно вам... В моменты стресса... усталости... беспокойства... вернитесь к полному дыханию... ... Когда будете готовы, откройте глаза... Несите дар осознанного дыхания в свой день... Пусть каждый вдох напоминает вам о присутствии... каждый выдох - о покое......"
    }
  ],

  morning: [
    {
      name: "Практика Утреннего Пробуждения",
      intro: "Добро пожаловать на эту практику утреннего пробуждения... Если вы ещё в кровати, мягко потянитесь... Если сидите, найдите удобное положение... Позвольте себе мягко перейти от сна к бодрствованию... ... Закройте глаза и почувствуйте благодарность за новый день... за возможность начать заново... за дар дыхания и жизни...",
      
      awakening: "Начните с нежного пробуждения тела... Медленно пошевелите пальцами рук и ног... Осторожно поверните голову из стороны в сторону... ... Почувствуйте, как тело пробуждается... как энергия медленно возвращается... Нет спешки... позвольте пробуждению быть мягким... естественным... ... Сделайте несколько глубоких вдохов... наполняя тело свежим кислородом... пробуждая все клетки... подготавливая их к новому дню......",
      
      gratitude: "Теперь обратитесь к благодарности... Начните с простого... Поблагодарите за то, что проснулись... за кровать, которая поддерживала вас... за крышу над головой... ... Поблагодарите за своё тело... за сердце, которое билось всю ночь... за лёгкие, которые дышали... за ум, который может думать и чувствовать... ... Почувствуйте, как благодарность наполняет грудь... как она естественно поднимает настроение... открывает сердце... настраивает на позитивное восприятие дня......",
      
      intention: "Теперь установите намерение для дня... Не список дел... а качество бытия... Как вы хотите присутствовать в дне?... С каким сердцем встретить вызовы и возможности?... ... Возможно, вы хотите быть более терпеливым... более добрым... более присутствующим... Или более смелым... более творческим... более любящим... ... Почувствуйте это намерение в теле... пусть оно станет внутренним компасом... направляющим ваши выборы и действия......",
      
      bodyPreparation: "Теперь подготовим тело к дню... Представьте золотой свет, входящий в макушку головы... Этот свет - энергия нового дня... сила и витальность... ... Позвольте свету медленно наполнить голову... пробуждая ясность ума... Свет течёт в шею... плечи... освобождая любое напряжение... ... Свет наполняет грудь... сердце... живот... давая энергию для дня... Течёт в руки... наполняя их силой для работы... в ноги... давая устойчивость для пути... ... Всё тело теперь наполнено светом... готово к дню......",
      
      mindPreparation: "Теперь подготовим ум... Представьте его как чистое небо... открытое... ясное... готовое к новым переживаниям... ... Если есть беспокойства о дне, заметьте их как облака в небе... Они могут проходить через ум... но не определяют его... Ум остаётся открытым... спокойным... готовым встретить всё с мудростью... ... Установите намерение подходить к дню с любопытством... с открытостью... с доверием к жизни......",
      
      affirmations: "Теперь мягко повторите с собой... Я готов к новому дню... У меня есть всё необходимое для процветания... Я встречаю день с открытым сердцем... ... Я источник мира и любви... Я способен на великие дела... Я благодарен за возможности этого дня... ... Каждый момент - это подарок... Каждое дыхание - это благословение... Я выбираю радость... я выбираю любовь... я выбираю присутствие......",
      
      closing: "Медленно начните двигаться... Осторожно потянитесь... Почувствуйте энергию в теле... ясность в уме... открытость в сердце... ... Если глаза закрыты, мягко откройте их... Посмотрите на мир свежими глазами... глазами благодарности... глазами удивления... ... Встаньте медленно... почувствуйте устойчивость... готовность... Вы готовы к дню... день готов к вам... Пусть это будет прекрасный день... наполненный присутствием... любовью... и радостью... Доброго утра......"
    }
  ]
  },

  zh: {
    sleep: [
    {
      name: "身体扫描助眠冥想",
      intro: "欢迎来到这个深度睡眠冥想... 舒适地躺在床上，让身体完全放松在床垫上... 轻柔地闭上眼睛，开始关注你的呼吸... 现在你什么都不需要做，只需放松并聆听我的声音...",
      
      breathing: "让我们从安静的呼吸开始... 缓慢地通过鼻子吸气，数到五... 一... 二... 三... 四... 五... 轻柔地屏住呼吸五秒... 一... 二... 三... 四... 五... 现在缓慢地通过嘴巴呼气，数到五... 一... 二... 三... 四... 五... 让呼吸回到自然的节奏... 每一次呼吸都感受到更多的放松......",
      
      bodyRelaxation: "现在我们进行温和的身体扫描，释放任何紧张... 首先关注你的双脚... 感受它们变得沉重而温暖... 让这种沉重感向上延伸到脚踝... 小腿... 膝盖... 感受双腿更深地沉入床中... ... 现在关注臀部和下背部... 让它们软化和放松... 感受腹部随着每次呼吸起伏... 胸部轻柔地扩张... ... 关注肩膀... 让它们从耳朵旁边落下... 感受手臂的重量... 沉重而放松... 双手安静地休息... ... 关注颈部... 让它拉长并软化... 下巴放松... 面部放松... 甚至眼睛周围的细小肌肉也都释放......",
      
      visualization: "想象自己在一个宁静的地方... 也许你躺在柔软的云朵上... 轻柔地漂浮在星空中... 或者你在一个美丽的花园里休息... 被淡淡的薰衣草香气包围... 空气温度正好... 你感到完全安全和受保护... ... 每一次呼吸，你都沉入更深的放松... 你的心变得安静平和... 像一面平静的湖水映照着月亮... 任何涌现的想法都像云朵一样飘走... 没有必要抓住任何东西......",
      
      affirmations: "当你在这完美的宁静中休息时，知道... 你是安全的... 你是温暖的... 你受到保护... 你被爱着... ... 你的身体知道如何睡眠... 现在可以安全地放手... 你值得这样的休息... 明天会照顾自己... ... 此时此刻，一切都恰到好处......",
      
      closing: "继续在这宁静的状态中休息... 你的身体沉重而放松... 你的心安静平和... 每一次呼吸，你都沉入更安宁的睡眠... ... 现在我将让你漂入宁静的梦境... 睡得安好... 深深休息... 在该醒来的时候神清气爽地醒来... 美梦......"
    },
    
    {
      name: "海浪催眠冥想",
      intro: "欢迎来到这个舒缓的海洋睡眠冥想... 舒适地安置在床上，让自己完全舒适... 闭上眼睛，想象你躺在日落时分的美丽海滩上... 温柔海浪的声音将引导你进入宁静的睡眠...",
      
      breathing: "从深呼吸开始... 吸入清新的海洋空气... 感受它完全充满你的肺部... 缓慢呼气... 释放一天的所有紧张... ... 聆听海浪的节奏... 吸气... 呼气... 吸气... 呼气... 让你的呼吸配合这自然的节奏... 每一次呼吸都带你更深入放松......",
      
      oceanVisualization: "想象自己躺在温暖柔软的沙滩上... 太阳正在落山，将天空染成美丽的色彩... 你听到温柔的海浪声涌向岸边... 每一道海浪都带走你的担忧和压力... ... 感受温暖的沙子支撑着你的身体... 温柔的海风抚摸着你的肌肤... 在这里你完全安全和宁静... ... 随着每一道涌来的海浪，你感到更加困倦... 更加放松... 大海在为你唱摇篮曲......",
      
      bodyRelaxation: "现在让海浪冲洗你的身体... 从双脚开始... 感受它们变得像湿沙一样沉重... 海浪流过你的腿部... 让它们完全放松和沉重... ... 温柔的海水流过臀部和下背部... 所有紧张都像被潮水抚平的沙子一样消融... 手臂平静地漂浮... 沉重而放松... ... 感受海浪冲洗过胸部... 肩膀... 颈部... 面部变得柔软宁静... 完全放松......",
      
      affirmations: "随着每一道海浪，你知道... 你安全受保护... 大海温柔地拥抱你... 你处于完美的宁静中... ... 你的身体准备好深度恢复性睡眠... 海浪带走所有担忧... 明天将带来新的可能... ... 此刻只有宁静... 只有休息... 只有温柔的海浪声......",
      
      closing: "继续在这宁静的海滩上休息... 海浪继续它们温柔的节奏... 摇摆着你入睡... ... 让海洋的声音带你进入美丽的梦境... 深深地睡... 完全地休息... 像海上的黎明一样清新地醒来... 美梦......"
    }
  ],

  stress: [
    {
      name: "正念压力释放",
      intro: "欢迎来到这个压力释放冥想... 找一个舒适的坐姿，保持背部挺直但不紧张... 将双脚平放在地上，感受地面的支撑... 轻柔地将手放在膝盖上... 当你准备好时，闭上眼睛或轻柔地向下注视...",
      
      breathing: "让我们从几次深度净化呼吸开始... 通过鼻子吸气，完全充满肺部... 通过嘴巴呼气，释放任何紧张... ... 再次深深吸气... 感受胸部和腹部的扩张... 呼气... 释放压力和担忧... 再一次... 吸入清新平静的能量... 呼出所有不再服务于你的东西......",
      
      stressAcknowledgment: "现在温柔地承认你承载的任何压力或紧张... 不要批判这些感受... 只是以友善的态度注意它们... 压力是自然的... 这是身体对挑战做出反应的方式... ... 将这种压力想象为你心灵天空中的一朵云... 云朵来了又去... 它们不是天空... 你是天空... 广阔、开放、宁静......",
      
      breathingFocus: "现在将温柔的注意力转向你的呼吸... 注意吸气和呼气的自然流动... 每次吸气带来平静和清晰... 每次呼气释放紧张和压力... ... 如果心思被担忧分散，温柔地将注意力带回呼吸... 这是你的锚... 你在当下时刻的安全地方......",
      
      bodyRelease: "从头顶到脚趾扫描你的身体... 注意任何紧张或紧绷的区域... 将呼吸引导到这些区域... 想象紧张随着每次呼气而消散... ... 特别关注肩膀... 压力经常停留在这里... 让它们从耳朵旁边落下... 轻柔地放松... 感受释放......",
      
      affirmations: "当你以这种平静的节奏呼吸时，轻柔地重复... 我是平静的... 我是安全的... 这个时刻会过去... 我拥有所需的一切... ... 我选择平和而非压力... 我选择清晰而非混乱... 我选择临在而非担忧... ... 每次吸气给我力量... 每次呼气释放我不需要的......",
      
      closing: "继续坐在这宁静的状态中... 呼吸自然而平静... 身体放松而柔软... ... 将这种平静的感觉带入你的一天... 记住你可以随时回到这种呼吸... 这是你的平和源泉... 始终为你可用... 当你准备好时，轻柔地睁开眼睛......"
    }
  ],

  focus: [
    {
      name: "专注力集中冥想",
      intro: "欢迎来到这个改善专注力和集中力的冥想... 舒适地坐着，保持背部挺直... 将双脚放在地上，放松肩膀... 舒适地将手放在膝盖上... 当你准备好时，轻柔地闭上眼睛...",
      
      breathing: "从建立呼吸节奏开始... 吸气数四拍... 一... 二... 三... 四... 屏住呼吸数两拍... 一... 二... 呼气数四拍... 一... 二... 三... 四... ... 继续这个节奏... 让心思调整到这个简单的练习... 呼吸成为你的专注点......",
      
      mindTraining: "心思自然会游走... 这是正常的... 当你注意到思绪分散时，温柔地不加评判地将注意力带回呼吸... 这就像训练注意力的肌肉... ... 每次你重新聚焦，你都在加强专注的能力... 当心思分散时这不是失败... 这是训练的机会......",
      
      singlePointFocus: "现在选择一个专注点... 这可以是鼻子处的呼吸感觉... 或腹部的起伏... 或呼吸的声音... ... 将所有注意力指向这一点... 当心思被其他想法、声音或感觉分散时，温柔地将它带回到选择的点... ... 这是单点注意力的练习... 所有专注形式的基础......",
      
      concentration: "感受心思变得更加集中... 更加清晰... 注意注意力的质量... 当它专一时，自然的轻松和平静就会出现... ... 你在这里发展的这种专注能力，会转移到生活的所有方面... 工作、关系、创造力... ... 每一个临在的时刻都加强了你保持专注的能力......",
      
      affirmations: "当你继续专注地呼吸时... 知道... 我的心清晰而专注... 我可以按选择引导我的注意力... 我临在于这个时刻... ... 专注是我正在发展的技能... 每次练习我都变得更加专注... 我有引导我心思的力量......",
      
      closing: "慢慢地从专注点扩展意识... 包括房间的声音... 身体在椅子上的感觉... ... 将这种清晰、专注的注意力质量带入你的一天... 记住你可以随时回到呼吸来居中... ... 当你准备好时，轻柔地睁开眼睛... 感到清晰、专注和临在......"
    }
  ],

  anxiety: [
    {
      name: "缓解焦虑冥想",
      intro: "欢迎来到这个处理焦虑的冥想... 找一个安全、舒适的地方坐下... 将双脚放在地上，感受大地的支撑... 一只手放在心脏上，另一只手放在腹部... 闭上眼睛或轻柔地低下目光...",
      
      grounding: "让我们从扎根于当下时刻开始... 感受你身体与椅子的接触点... 双脚在地上... 双手在身体上... ... 你在这里... 你是安全的... 在这个时刻一切都好... 做几次深呼吸，提醒自己：'我在这里，我是安全的'......",
      
      breathingForAnxiety: "现在我们用呼吸来平静神经系统... 慢慢吸气数四拍... 一... 二... 三... 四... 屏住呼吸数四拍... 一... 二... 三... 四... 慢慢呼气数六拍... 一... 二... 三... 四... 五... 六... ... 长的呼气激活副交感神经系统... '休息和恢复'系统... 继续这个节奏......",
      
      anxietyAcknowledgment: "温柔地承认存在的任何焦虑... 不要试图赶走它... 只是以同情心注意... 焦虑经常试图保护我们... 感谢它尝试关心... ... 对焦虑说：'谢谢你的关心... 此刻我是安全的... 此刻一切都好'... ... 将焦虑想象为一波浪... 波浪升起又落下... 它们不会永远持续......",
      
      bodyCalming: "将注意力引导到身体感受到焦虑的区域... 也许是胸部、腹部或喉咙... 温柔地向这些区域呼吸... ... 想象温暖的金色光线随着每次吸气进入这些地方... 光线带来平静和治愈... 随着每次呼气，紧张和焦虑消散......",
      
      affirmations: "当你继续以平静的节奏呼吸时... 轻柔地重复... 这个时刻会过去... 我拥有应对它所需的一切... 我比我的焦虑更强大... ... 我选择平和... 我选择冷静... 我选择信任生命... 每次吸气给我平静... 每次呼气释放恐惧......",
      
      closing: "继续坐在这平静的状态中... 呼吸缓慢而深入... 身体更加放松... 心思更加平和... ... 记住这些工具始终与你同在... 当需要平静时回到呼吸... 你比你认为的更强大... ... 当你准备好时，轻柔地睁开眼睛... 带着这种平静与你同行......"
    }
  ],

  energy: [
    {
      name: "晨间活力冥想",
      intro: "欢迎来到这个活力冥想... 坐直，胸部开放，头部抬起... 双脚稳稳地放在地上... 双手掌心向上放在膝盖上... 闭上眼睛，感受准备接收能量...",
      
      energizingBreath: "让我们从唤醒能量的呼吸开始... 通过鼻子深吸气，充满腹部... 然后快速有力地通过嘴巴呼气... 重复三次... ... 现在回到自然呼吸... 注意身体已经感到更加警觉... 更加有活力......",
      
      bodyActivation: "想象胸部中央有一道明亮的金光... 这是你内在的能量源泉... 每次吸气光线变得更亮... 更强... ... 现在将这道光线引导向下通过脊柱... 给每个椎骨充电... 感受能量流入双腿... 给你力量的基础... ... 将光线向上引导通过颈部到头部... 唤醒心思的清晰... 然后向下流入双臂... 充满行动的力量......",
      
      vitality: "感受这生命能量在全身循环... 这是你的自然力量... 你与生俱来的活力... 它始终为你可用... ... 想象这能量从你的身体散发出来... 创造一个力量和信心的发光光环... 你感到有活力... 警觉... 准备迎接这一天......",
      
      intention: "现在为这一天设定意图... 你想如何使用这能量？... 什么目标对你重要？... 感受从内心升起的动机和热情... ... 视觉化自己以这种能量生活这一天... 轻松地解决任务... 从力量和喜悦的地方与他人互动......",
      
      affirmations: "当能量继续循环时... 以信念重复... 我充满生命力... 我有完成重要事情的能量... 我以热情接近这一天... ... 我的身体强壮健康... 我的心思清晰专注... 我的心对可能性开放... 我散发积极能量......",
      
      closing: "慢慢开始移动手指和脚趾... 小心地左右转动头部... 向天空伸展... ... 睁开眼睛，感到完全觉醒... 有活力... 准备迎接这一天... 带着这能量与你同行... 当需要动机时回到它... 你拥有度过美好一天所需的一切......"
    }
  ],

  mindfulness: [
    {
      name: "当下觉知",
      intro: "欢迎来到这个当下觉知的冥想... 舒适地坐直，双脚轻轻放在地上... 双手自然地放在膝盖上... 轻柔地闭上眼睛... 现在，让我们一起回到当下这个珍贵的时刻...",
      
      breathing: "将注意力带到你的呼吸上... 不需要改变什么，只是观察... 感受空气进入鼻孔的感觉... 感受胸腔的起伏... 感受腹部的自然扩张和收缩... ... 每一次呼吸都是一个新的当下... 每一次呼吸都是一个回到此时此地的机会......",
      
      bodyAwareness: "现在让我们觉察身体的感受... 从头顶开始，感受头皮的触觉... 感受额头的温度... 感受眼皮的重量... ... 将注意力移到肩膀... 感受肩膀的位置... 它们紧张吗？还是放松？... 不需要改变什么，只是观察... ... 感受背部靠在椅子上的感觉... 感受双手的位置... 感受双脚与地面的接触... 这就是当下的身体感受......",
      
      mindfulAwareness: "现在让我们觉察心念的流动... 当思绪出现时，不要抗拒... 也不要追随... 只是观察它们，就像观察天空中的云朵... ... 标记这些思绪... 如果是关于过去的，轻轻地说'回忆'... 如果是关于未来的，轻轻地说'计划'... 如果是情绪，轻轻地说'感受'... 然后温柔地回到呼吸......",
      
      presentMoment: "此时此刻... 你就在这里... 你就是完整的... 不需要成为别的什么... 不需要去到别的地方... 当下就是生命展现的地方... ... 感受这个当下的丰富... 感受心跳的律动... 感受呼吸的深度... 感受生命在你体内的流动... 这就是正念... 这就是当下觉知......",
      
      affirmations: "深深地吸气... 感受当下的宁静... 我在这里... 我是完整的... 我接受这个当下... ... 我对内心的智慧开放... 我对生命的美好开放... 我在觉知中安住... 我在当下中找到平静......",
      
      closing: "慢慢地将这份觉知带回到日常生活中... 知道无论何时，你都可以回到呼吸... 回到当下... 回到这份内在的宁静... ... 轻轻地张开眼睛... 带着新鲜的觉知... 带着对当下的珍视... 愿你在生活中保持这份正念觉知......"
    }
  ],

  compassion: [
    {
      name: "慈悲心修习",
      intro: "欢迎来到这个慈悲心修习的冥想... 找到一个舒适的姿势... 双手轻轻地放在心口... 感受心脏的跳动... 感受胸腔的温暖... 让我们一起培养内心的慈悲与爱...",
      
      breathing: "从慈悲的呼吸开始... 每次吸气时，想象你在吸入爱与慈悲... 每次呼气时，想象你在送出祝福与关怀... ... 让呼吸成为慈悲的载体... 让每一次呼吸都充满温暖的意图... 感受心中升起的柔软......",
      
      selfCompassion: "首先，让我们对自己送出慈悲... 将双手放在心口... 感受手掌的温暖... 对自己温柔地说... 愿我快乐... 愿我安全... 愿我内心平静... 愿我对自己慈悲... ... 如果内心有批判的声音，用慈悲包容它... 如果有痛苦，用爱抚慰它... 你值得被爱... 你值得被善待... 包括被自己善待......",
      
      lovedOnes: "现在想象一个你深爱的人... 可能是家人... 朋友... 或者一个孩子... 在心中看见他们的笑容... 感受对他们的爱... ... 将这份爱从心中送出... 愿你快乐... 愿你安全... 愿你内心平静... 愿你被爱包围... 感受这份爱的温暖在心中扩散......",
      
      difficultPerson: "现在，如果你准备好了，想象一个与你有矛盾的人... 不需要选择最困难的人... 只是一个让你略有不舒服的人... ... 看见他们也在寻求快乐... 他们也在试图避免痛苦... 就像你一样... 从慈悲的角度送出祝福... 愿你快乐... 愿你安全... 愿你内心平静... 愿你找到你寻求的幸福......",
      
      universalCompassion: "现在让慈悲之心扩展到所有众生... 想象这个世界上的每一个人... 每一个生命... 都在寻求快乐... 都在试图避免痛苦... ... 让慈悲之光从你的心中向四面八方散发... 愿所有众生快乐... 愿所有众生安全... 愿所有众生内心平静... 愿所有众生自由自在......",
      
      affirmations: "感受心中慈悲之花的绽放... 我的心是慈悲的... 我的心是开放的... 我选择以爱回应世界... ... 我原谅自己的不完美... 我接受他人的人性... 我是慈悲的载体... 我是爱的传播者......",
      
      closing: "将双手继续放在心口... 感受慈悲之心的跳动... 知道这颗慈悲心将伴随你整日... 在每一个相遇中... 在每一个决定中... ... 慢慢地张开眼睛... 带着一颗慈悲的心... 带着对众生的祝福... 愿你成为世界的光明......"
    }
  ],

  walking: [
    {
      name: "正念行走",
      intro: "欢迎来到这个正念行走的冥想... 如果可能，找一个可以慢慢走动的空间... 如果不能实际行走，你可以坐着想象... 让我们一起体验行走中的正念...",
      
      preparation: "首先，静静地站立... 感受双脚与地面的接触... 感受身体的重量如何分布在双脚上... 感受脚底的触感... 感受腿部肌肉的支撑... ... 让身体自然地摆正... 头部轻轻抬起... 肩膀放松... 双臂自然下垂... 这就是正念站立......",
      
      mindfulSteps: "现在，我们开始缓慢的行走... 抬起右脚... 感受脚离开地面的感觉... 感受腿部肌肉的收缩... 感受脚在空中的移动... ... 轻轻地将脚放下... 感受脚与地面的接触... 感受重心的转移... 感受身体重量的变化... ... 现在抬起左脚... 重复同样的过程... 抬起... 移动... 放下... 触地... 每一步都是一个完整的体验......",
      
      breathingWalk: "将呼吸与步伐同步... 吸气时迈出一步... 呼气时迈出一步... 不要急于求成... 让呼吸和步伐自然地协调... ... 如果心思游离，就停下来... 重新感受双脚与地面的接触... 重新感受呼吸... 然后继续... 没有目的地... 只有这个过程......",
      
      awareness: "在行走中保持觉知... 注意周围的声音... 但不要被它们带走... 注意身体的感觉... 腿部的运动... 手臂的摆动... 平衡的调节... ... 如果是在户外，感受微风... 感受阳光... 感受大地的支撑... 如果是在室内，感受空间... 感受温度... 感受光线... 每一个感觉都是当下的礼物......",
      
      innerWalk: "现在，即使在行走中... 也可以向内观察... 观察心念的流动... 观察情绪的变化... 观察身体的反应... ... 行走成为一种移动的冥想... 每一步都是一个新的当下... 每一步都是一个回到自己的机会... 行走不仅仅是身体的移动... 更是心灵的旅程......",
      
      affirmations: "在行走中体验生命的流动... 我的每一步都是神圣的... 我的身体是智慧的... 我在移动中找到宁静... ... 我与大地连接... 我与当下同在... 我在行走中修行... 我在移动中觉醒......",
      
      closing: "慢慢地停下脚步... 再次感受双脚与地面的接触... 感受身体的稳定... 感受呼吸的自然... ... 无论你走到哪里... 这份正念都可以伴随你... 每一步都可以是修行... 每一步都可以是觉醒... 带着这份正念行走的智慧... 继续你的人生旅程......"
    }
  ],

  breathing: [
    {
      name: "完整呼吸法",
      intro: "欢迎来到这个完整呼吸法的冥想... 舒适地坐直或躺下... 一只手放在胸口... 另一只手放在腹部... 让我们一起学习完整而深层的呼吸...",
      
      naturalBreath: "首先，观察你的自然呼吸... 不要试图改变什么... 只是观察... 感受空气进入的路径... 感受胸腔的变化... 感受腹部的移动... ... 注意哪只手移动得更多... 是胸口的手？还是腹部的手？... 只是观察... 没有对错... 这就是你当下的呼吸模式......",
      
      abdominalBreath: "现在让我们学习腹式呼吸... 想象你的腹部是一个温柔的气球... 吸气时，让这个气球慢慢膨胀... 呼气时，让它慢慢收缩... ... 胸口的手保持相对静止... 腹部的手随着呼吸轻柔地上下移动... 这就是深层的腹式呼吸... 这是最自然、最滋养的呼吸方式......",
      
      chestBreath: "现在让我们体验胸式呼吸... 保持腹部相对静止... 让胸腔主导呼吸... 感受肋骨的扩张... 感受胸腔的打开... ... 吸气时，胸腔向外扩展... 呼气时，轻柔地收缩... 感受这种更高位的呼吸... 它带来不同的感受... 不同的能量......",
      
      completeBreath: "现在，让我们结合两种呼吸... 进行完整的呼吸... 吸气时，首先让腹部膨胀... 然后让胸腔扩张... 最后让肩膀轻微抬起... ... 呼气时，反过来... 先让肩膀放下... 然后让胸腔收缩... 最后让腹部回收... 这是一个完整的呼吸循环... 像波浪一样流畅......",
      
      rhythmicBreath: "现在让我们为呼吸建立节奏... 吸气数四拍... 一... 二... 三... 四... 屏息两拍... 一... 二... 呼气数六拍... 一... 二... 三... 四... 五... 六... ... 如果这个节奏不适合你，可以调整... 重要的是保持呼吸的深度和完整性... 让呼吸成为你内在的音乐......",
      
      healingBreath: "感受这完整呼吸的治愈力量... 每一次吸气，你在吸入生命的能量... 吸入氧气... 吸入活力... 每一次呼气，你在释放紧张... 释放毒素... 释放不需要的东西... ... 让呼吸成为你最好的朋友... 它始终与你同在... 它是你内在平静的源泉... 它是你力量的根基......",
      
      affirmations: "深深地吸气... 感受呼吸的治愈力量... 我的呼吸是神圣的... 我的呼吸是治愈的... 我通过呼吸与生命连接... ... 每一次呼吸都是新的开始... 每一次呼吸都是内在的净化... 我在呼吸中找到平静... 我在呼吸中找到力量......",
      
      closing: "慢慢地将呼吸回归自然... 不需要控制... 只是让它自然地流动... 感受这份新的呼吸觉知... 感受身体的放松... 感受心灵的宁静... ... 记住，无论何时你需要平静... 你都可以回到呼吸... 回到这个完整的呼吸法... 它是你最忠实的伙伴... 它是你内在智慧的钥匙......"
    }
  ],

  morning: [
    {
      name: "晨曦觉醒",
      intro: "欢迎来到这个晨曦觉醒的冥想... 新的一天正在开始... 让我们一起以感恩和意图迎接这个美好的开始... 舒适地坐直... 面向东方如果可能... 准备迎接新一天的光明...",
      
      gratitude: "首先，让我们对这个新的一天表达感恩... 感恩你能够醒来... 感恩生命的礼物... 感恩呼吸的自由... 感恩身体的健康... ... 想想昨天的美好时刻... 想想今天的可能性... 想想生命中的支持和爱... 让感恩之心充满整个胸腔... 让它成为这一天的第一个礼物......",
      
      sunVisualization: "现在想象太阳正在升起... 即使你看不到它... 也能感受到它的存在... 想象金色的光芒穿过云层... 温暖大地... 唤醒自然... ... 这同样的光芒也在照亮你的心... 驱散夜晚的阴霾... 带来新的希望... 新的可能性... 感受这内在的阳光... 感受它的温暖和力量......",
      
      bodyAwakening: "让我们温柔地唤醒身体... 从头顶开始... 感受头脑的清晰... 感受眼睛的明亮... 感受面部的放松... ... 轻轻地转动肩膀... 感受胸腔的开放... 感受心脏的有力跳动... 感受呼吸的深度... ... 伸展手臂... 感受力量的流动... 感受脊柱的挺直... 感受腿部的稳定... 身体正在为新一天做准备......",
      
      intention: "现在让我们为这一天设定意图... 你今天想要如何生活？... 你想要带给世界什么？... 你想要体验什么样的情感？... ... 不是要做什么... 而是要成为什么样的人... 是否想要更有耐心？... 更有爱心？... 更有创造力？... 在心中种下这个意图的种子... 让它在今天开花结果......",
      
      energy: "感受内在能量的苏醒... 这是你天生的活力... 你与生俱来的力量... 它像清晨的甘露一样清新... 像初升的太阳一样明亮... ... 让这能量流遍全身... 从头顶到脚趾... 从心脏到手指... 感受每个细胞的活跃... 感受生命力的涌动... 你准备好迎接这一天了......",
      
      affirmations: "在这个美好的开始中... 重复这些肯定... 今天是新的开始... 我充满感恩... 我充满能量... 我准备好迎接挑战... ... 我选择喜悦... 我选择成长... 我选择爱... 我是自己生命的创造者... 今天将是美好的一天......",
      
      closing: "慢慢地将这份晨曦的能量带入你的一天... 无论遇到什么... 记住这个平静的开始... 记住这份感恩的心... 记住这个美好的意图... ... 轻轻地张开眼睛... 如果它们还没有睁开... 深深地吸一口气... 伸展身体... 准备迎接这个充满可能性的新一天... 愿你的一天如晨曦般美好......"
    }
  ]
  },

  ja: {
    sleep: [
    {
      name: "ボディスキャン睡眠瞑想",
      intro: "この深い眠りのための瞑想へようこそ... ベッドに心地よく横になり、体をマットレスに完全にリラックスさせてください... そっと目を閉じて、呼吸に注意を向け始めてください... 今は何もする必要はありません、ただリラックスして私の声を聞いてください...",
      
      breathing: "静かな呼吸から始めましょう... 鼻からゆっくりと息を吸って、五つ数えてください... いち... に... さん... よん... ご... やさしく息を止めて五つ数えます... いち... に... さん... よん... ご... そして口からゆっくりと息を吐いて五つ数えます... いち... に... さん... よん... ご... 呼吸を自然なリズムに戻してください... 一呼吸ごとにより深いリラックスを感じてください......",
      
      bodyRelaxation: "では、緊張を解放するために優しいボディスキャンを行いましょう... まず足に注意を向けてください... 足が重く温かくなるのを感じてください... この重さが足首を通って上がっていくのを感じましょう... ふくらはぎ... 膝... 脚がベッドの中により深く沈んでいくのを感じてください... ... 今度は腰と下背部に注意を向けてください... それらが柔らかくなりリラックスするのを感じてください... お腹が呼吸とともに上下するのを感じてください... 胸がやさしく広がります... ... 肩に注意を向けてください... 肩を耳から離すように落としてください... 腕の重さを感じてください... 重くリラックスした状態で... 手が静かに休んでいます... ... 首に注意を向けてください... 首が伸びて柔らかくなるのを感じてください... 顎がリラックスします... 顔がリラックスします... 目の周りの小さな筋肉さえも解放されます......",
      
      visualization: "平和な場所にいる自分を想像してください... もしかしたらあなたは柔らかな雲の上に横たわって... 星空の中をやさしく漂っているかもしれません... あるいは美しい庭で休んでいるかもしれません... やさしいラベンダーの香りに包まれて... 空気の温度が完璧です... あなたは完全に安全で守られていると感じています... ... 一呼吸ごとに、あなたはより深いリラックスに沈んでいきます... あなたの心は静かで平和になります... 月を映す静かな湖のように... 浮かんでくるどんな思考も雲のように流れ去ります... 何かにしがみつく必要はありません......",
      
      affirmations: "この完璧な平和の中で休みながら、知ってください... あなたは安全です... あなたは温かいです... あなたは守られています... あなたは愛されています... ... あなたの体は眠り方を知っています... 今、手放しても安全です... あなたはこの休息に値します... 明日は自分で面倒を見てくれます... ... 今この瞬間、すべてがあるべき通りです......",
      
      closing: "この平和な状態で休み続けてください... あなたの体は重くリラックスしています... あなたの心は静かで平和です... 一呼吸ごとに、あなたはより安らかな眠りに沈んでいきます... ... 私はあなたを平和な夢の中に漂わせましょう... よく眠ってください... 深く休んでください... そして目覚めるべき時に爽やかに目覚めてください... よい夢を......"
    },
    
    {
      name: "波の音睡眠瞑想",
      intro: "この心を落ち着かせる海の睡眠瞑想へようこそ... ベッドに心地よく身を置き、完全に快適にしてください... 目を閉じて、夕日の美しいビーチに横たわっていることを想像してください... やさしい波の音があなたを平和な眠りへと導いてくれます...",
      
      breathing: "深い呼吸から始めましょう... 新鮮な海の空気を吸い込んでください... それがあなたの肺を完全に満たすのを感じてください... ゆっくりと息を吐いてください... 一日のすべての緊張を解放しながら... ... 波のリズムを聞いてください... 吸って... 吐いて... 吸って... 吐いて... あなたの呼吸をこの自然なリズムに合わせてください... 一呼吸ごとにあなたをより深いリラックスへと導きます......",
      
      oceanVisualization: "温かい柔らかな砂の上に横たわっている自分を想像してください... 太陽が沈んでいき、空を美しい色に染めています... あなたはやさしい波の音が岸に打ち寄せるのを聞いています... 一つ一つの波があなたの心配やストレスを運び去ってくれます... ... 温かい砂があなたの体を支えているのを感じてください... やさしい海風があなたの肌を撫でています... ここであなたは完全に安全で平和です... ... 打ち寄せる波ごとに、あなたはより眠くなり... よりリラックスしていきます... 海があなたに子守歌を歌ってくれています......",
      
      bodyRelaxation: "今、波があなたの体を洗い流すのを感じてください... 足から始まって... 足が濡れた砂のように重くなるのを感じてください... 波があなたの脚を流れて... 完全にリラックスして重くなります... ... やさしい水が腰と下背部を流れます... すべての緊張が潮に撫でられた砂のように溶け去ります... 腕が平和に漂います... 重くリラックスしています... ... 波が胸を... 肩を... 首を洗い流すのを感じてください... 顔が柔らかく平和になります... 完全にリラックスしています......",
      
      affirmations: "一つ一つの波とともに、あなたは知っています... あなたは安全で守られています... 海があなたをやさしく抱いています... あなたは完璧な平和の中にいます... ... あなたの体は深い回復の眠りの準備ができています... 波がすべての心配を運び去ってくれます... 明日は新しい可能性をもたらしてくれるでしょう... ... 今この瞬間、平和だけがあります... 休息だけがあります... やさしい波の音だけがあります......",
      
      closing: "この平和なビーチで休み続けてください... 波がやさしいリズムを続けています... あなたを眠りへと揺らしています... ... 海の音があなたを美しい夢へと運ばせてください... 深く眠ってください... 完全に休んでください... そして海の上の夜明けのように爽やかに目覚めてください... よい夢を......"
    }
  ],

  stress: [
    {
      name: "マインドフルネスストレス解放",
      intro: "このストレス解放瞑想へようこそ... 快適な座る姿勢を見つけて、背筋をまっすぐに、しかし緊張させずに保ってください... 足を床に平らに置き、地面のサポートを感じてください... やさしく手を膝の上に置いてください... 準備ができたら、目を閉じるか、やさしく下向きに視線を向けてください...",
      
      breathing: "いくつかの深い浄化の呼吸から始めましょう... 鼻から息を吸って、肺を完全に満たしてください... 口から息を吐いて、あらゆる緊張を解放してください... ... 再び深く息を吸ってください... 胸とお腹の広がりを感じてください... そして息を吐いてください... ストレスと心配を解放して... もう一度... 新鮮で落ち着いたエネルギーを吸い込んで... もはやあなたの役に立たないすべてのものを吐き出してください......",
      
      stressAcknowledgment: "今、あなたが抱えているあらゆるストレスや緊張をやさしく認めてください... これらの感情を判断しないでください... ただ親切な気持ちでそれらに気づいてください... ストレスは自然なものです... これは体が課題に反応する方法です... ... このストレスをあなたの心の空の雲として想像してください... 雲は来ては去ります... 雲は空ではありません... あなたが空です... 広大で、開かれていて、平和です......",
      
      breathingFocus: "今、あなたの呼吸にやさしい注意を向けてください... 吸気と呼気の自然な流れに気づいてください... 一回一回の吸気が平静と明晰さをもたらします... 一回一回の呼気が緊張とストレスを解放します... ... もし心が心配事によって散らされたら、やさしく注意を呼吸に戻してください... これがあなたの錨です... 現在の瞬間におけるあなたの安全な場所です......",
      
      bodyRelease: "頭のてっぺんからつま先まで体をスキャンしてください... 緊張や硬さのある部分に気づいてください... これらの部分に呼吸を向けてください... 一回一回の呼気とともに緊張が溶け去っていくのを想像してください... ... 特に肩に注意を払ってください... ストレスはしばしばここに留まります... 肩を耳から落とすように... やさしくリラックスさせてください... 解放を感じてください......",
      
      affirmations: "この穏やかなリズムで呼吸している間、やさしく繰り返してください... 私は穏やかです... 私は安全です... この瞬間は過ぎ去ります... 私は必要なすべてを持っています... ... 私はストレスの代わりに平和を選びます... 私は混乱の代わりに明晰さを選びます... 私は心配の代わりに存在を選びます... ... 一回一回の吸気が私に力を与えます... 一回一回の呼気が私に不要なものを解放させます......",
      
      closing: "この平和な状態に座り続けてください... 呼吸は自然で穏やかです... 体はリラックスして柔らかです... ... この平静の感覚をあなたの一日に持ち込んでください... いつでもこの呼吸に戻ることができることを覚えておいてください... これがあなたの平和の源です... いつでもあなたに利用可能です... 準備ができたら、やさしく目を開けてください......"
    }
  ],

  focus: [
    {
      name: "集中力向上瞑想",
      intro: "この集中力と注意力を向上させる瞑想へようこそ... 背筋をまっすぐにして快適に座ってください... 足を床に置き、肩をリラックスさせてください... 手を快適に膝の上に置いてください... 準備ができたら、やさしく目を閉じてください...",
      
      breathing: "呼吸のリズムを確立することから始めましょう... 四つ数えながら息を吸ってください... いち... に... さん... よん... 二つ数えながら息を止めてください... いち... に... 四つ数えながら息を吐いてください... いち... に... さん... よん... ... このリズムを続けてください... 心をこの単純な練習に調整させてください... 呼吸があなたの集中点になります......",
      
      mindTraining: "心は自然にさまよいます... これは正常なことです... 思考が散らばっていることに気づいたら、判断することなくやさしく注意を呼吸に戻してください... これは注意力の筋肉を鍛えることのようなものです... ... 集中を取り戻すたびに、あなたは集中力を強化しています... 心がさまようときそれは失敗ではありません... それは練習の機会です......",
      
      singlePointFocus: "今、一つの集中点を選んでください... それは鼻での呼吸の感覚かもしれません... またはお腹の上下かもしれません... または呼吸の音かもしれません... ... すべての注意をこの一点に向けてください... 心が他の思考、音、または感覚によって散らされたとき、やさしくそれを選択した点に戻してください... ... これは一点集中の練習です... すべての集中の形の基礎です......",
      
      concentration: "心がより集中し... より明晰になっていくのを感じてください... 注意力の質に気づいてください... それが一方向に向いているとき、自然な軽やかさと平静が現れます... ... あなたがここで発達させているこの集中力は、人生のすべての側面に移転します... 仕事、人間関係、創造性... ... 一瞬一瞬の存在があなたの集中を維持する能力を強化します......",
      
      affirmations: "集中して呼吸を続けながら... 知ってください... 私の心は明晰で集中しています... 私は選択によって注意を向けることができます... 私はこの瞬間に存在しています... ... 集中は私が発達させているスキルです... 練習するたびに私はより集中するようになります... 私は自分の心を導く力を持っています......",
      
      closing: "集中点から意識をゆっくりと広げてください... 部屋の音を含めてください... 椅子に座っている体の感覚を... ... この明晰で集中した注意力の質をあなたの一日に持ち込んでください... いつでもセンタリングのために呼吸に戻ることができることを覚えておいてください... ... 準備ができたら、やさしく目を開けてください... 明晰で、集中し、存在していると感じながら......"
    }
  ],

  anxiety: [
    {
      name: "不安軽減瞑想",
      intro: "この不安に対処する瞑想へようこそ... 安全で快適な場所に座ってください... 足を床に置き、大地のサポートを感じてください... 一方の手を心臓に、もう一方の手をお腹に置いてください... 目を閉じるか、やさしく視線を下に向けてください...",
      
      grounding: "現在の瞬間に根ざすことから始めましょう... あなたの体と椅子との接触点を感じてください... 床の上の足... 体の上の手... ... あなたはここにいます... あなたは安全です... この瞬間すべてが大丈夫です... いくつかの深い呼吸をして、自分自身に思い出させてください：「私はここにいる、私は安全だ」......",
      
      breathingForAnxiety: "今、神経系を落ち着かせるために呼吸を使いましょう... 四つ数えながらゆっくり息を吸ってください... いち... に... さん... よん... 四つ数えながら息を止めてください... いち... に... さん... よん... 六つ数えながらゆっくり息を吐いてください... いち... に... さん... よん... ご... ろく... ... 長い呼気は副交感神経系を活性化します... 「休息と回復」のシステムです... このリズムを続けてください......",
      
      anxietyAcknowledgment: "存在するあらゆる不安をやさしく認めてください... それを追い払おうとしないでください... ただ思いやりを持って気づいてください... 不安はしばしば私たちを保護しようとします... その配慮の試みに感謝してください... ... 不安に言ってください：「配慮をありがとう... 今この瞬間私は安全です... 今この瞬間すべてが大丈夫です」... ... 不安を波として想像してください... 波は上がっては下がります... それらは永遠に続くことはありません......",
      
      bodyCalming: "体の中で不安を感じる部分に注意を向けてください... それは胸、お腹、または喉かもしれません... これらの部分にやさしく息を向けてください... ... 一回一回の吸気とともに温かい金色の光がこれらの場所に入ってくるのを想像してください... 光は平静と癒しをもたらします... 一回一回の呼気とともに緊張と不安が溶け去ります......",
      
      affirmations: "落ち着いたリズムで呼吸を続けながら... やさしく繰り返してください... この瞬間は過ぎ去ります... 私はそれに対処するために必要なすべてを持っています... 私は私の不安よりも強いです... ... 私は平和を選びます... 私は平静を選びます... 私は人生を信頼することを選びます... 一回一回の吸気が私に平和をもたらします... 一回一回の呼気が恐れを解放します......",
      
      closing: "この穏やかな状態に座り続けてください... 呼吸は遅く深いです... 体はよりリラックスしています... 心はより平和です... ... これらの道具があなたと共にあることを覚えておいてください... 落ち着く必要があるときは呼吸に戻ってください... あなたは思っているよりも強いです... ... 準備ができたら、やさしく目を開けてください... この平静をあなたと共に持ち歩いてください......"
    }
  ],

  energy: [
    {
      name: "朝のエネルギー瞑想",
      intro: "このエネルギーを高める瞑想へようこそ... 胸を開き頭を上げてまっすぐに座ってください... 足をしっかりと床に置いてください... 手のひらを上向きにして膝の上に置いてください... 目を閉じてエネルギーを受け取る準備ができていることを感じてください...",
      
      energizingBreath: "エネルギーを目覚めさせる呼吸から始めましょう... 鼻から深く息を吸い、お腹を満たしてください... そして口から素早く力強く息を吐いてください... これを三回繰り返してください... ... 今、自然な呼吸に戻ってください... 体がすでにより警戒し... より活力を感じていることに気づいてください......",
      
      bodyActivation: "胸の中央に明るい金色の光を想像してください... これがあなたの内なるエネルギー源です... 一回一回の吸気とともに光がより明るく... より強くなります... ... 今、この光を脊椎を下って導いてください... 一つ一つの椎骨にエネルギーを与えます... エネルギーが脚に流れ込むのを感じてください... あなたに力の基盤を与えます... ... 光を首を通って頭に上向きに導いてください... 心の明晰さを目覚めさせます... そして腕に下向きに流してください... 行動の力で満たします......",
      
      vitality: "この生命エネルギーが全身を循環しているのを感じてください... これがあなたの自然な力です... あなたの生来の活力です... それは常にあなたに利用可能です... ... このエネルギーがあなたの体から放射されているのを想像してください... 力と自信の輝くオーラを作り出します... あなたは活力を感じ... 警戒し... 一日の準備ができています......",
      
      intention: "今、一日のための意図を設定してください... あなたはこのエネルギーをどのように使いたいですか？... どんな目標があなたにとって重要ですか？... 内側から立ち上がる動機と熱意を感じてください... ... このエネルギーで一日を過ごしている自分を視覚化してください... タスクを軽やかに解決し... 力と喜びの場所から他の人々と交流しています......",
      
      affirmations: "エネルギーが循環し続けている間... 確信を持って繰り返してください... 私は生命力に満ちています... 私は重要なことのためのエネルギーを持っています... 私は熱意を持って一日に取り組みます... ... 私の体は強く健康です... 私の心は明晰で集中しています... 私の心は可能性に開かれています... 私は前向きなエネルギーを放射します......",
      
      closing: "ゆっくりと指と足の指を動かし始めてください... 注意深く頭を左右に向けてください... 空に向かって伸びをしてください... ... 目を開けて完全に目覚め... エネルギッシュで... 一日の準備ができていると感じてください... このエネルギーをあなたと共に持ち歩いてください... 動機が必要なときにそれに戻ってください... あなたは素晴らしい一日に必要なすべてを持っています......"
    }
  ],

  mindfulness: [
    {
      name: "今この瞬間の気づき",
      intro: "このマインドフルネス瞑想へようこそ... 警戒心と安らぎを持って座れる快適な姿勢を見つけてください... この実践は現在の瞬間への気づきを育むことです... どこへ行く必要も何かを達成する必要もありません... ただここにいてください...",
      
      breathing: "呼吸に自分を錨づけることから始めましょう... 自然な呼吸のリズムに気づいてください... 変えようとしないで... ただ観察してください... ... 鼻孔を通って入る空気を感じてください... 少しの間... そして穏やかな解放... ... あなたの呼吸は常に現在の瞬間に起こっています... これを今ここへの錨として使ってください... 心がさまようとき... ただ呼吸に戻ってください... 判断なく... ただ穏やかに戻ってください......",
      
      bodyAwareness: "今、あなたの体を含むように意識を拡張してください... どのように座っているか気づいてください... 体が表面に触れている接触点を感じてください... ... 穏やかな好奇心で体をスキャンしてください... 今どのような感覚がありますか？... 温かさ... 冷たさ... 緊張... リラックス... ... ここにあるものをただ気づいてください... 何も変えようとしないで... あなたの体は存在への入り口です......",
      
      thoughtAwareness: "続けているうちに... 浮かんでくる思考に気づいてください... 物語に巻き込まれるのではなく... 思考を心の空を通り過ぎる雲のように観察できるかどうか見てください... ... ある思考は軽くて薄い... 他のものは重い嵐の雲かもしれません... すべて歓迎されます... すべて過ぎ去ります... ... あなたは思考ではありません... あなたは思考が現れ消えていく気づきの空間です......",
      
      presentMoment: "今この瞬間の豊かさに気づいてください... 聞こえる音... 体の感覚... 呼吸の感覚... 感情の微細な変化... ... 過去の記憶や未来の計画が浮かんできたとき... 穏やかに現在に戻ってください... ここに... 今に... ... 存在とは何かをすることではありません... 存在とは今ここにあることです......",
      
      affirmations: "この気づきの中で... 静かに知ってください... 私は現在の瞬間に存在しています... 私は生きている体験に気づいています... 私は平和で警戒しています... ... 私は思考や感情から離れて観察できます... 私は現在の瞬間の豊かさに開かれています... 私は今ここにあることを選択します......",
      
      closing: "この瞑想を終えるとき... この気づきの質は常にあなたに利用可能であることを知ってください... 一呼吸で... 一瞬の注意で... ... ゆっくりと指と足の指を動かし始めてください... 準備ができたら目を開けてください... この現在の瞬間の気づきを一日に持ち歩いてください... あなたは平和で警戒しています... あなたは存在しています......"
    }
  ],

  compassion: [
    {
      name: "慈悲の心の実践",
      intro: "この慈悲の瞑想へようこそ... 快適な姿勢に落ち着いて一方の手を心臓に置いてください... 慈愛の心を育てていきます... 最初は自分自身に向けて... そして他者に向けて広げていきます... これは心を開く実践です...",
      
      selfCompassion: "今のあなた自身を心に思い浮かべることから始めましょう... 今のあなた自身を想像してください... 親愛なる友人を見るように... 優しい目で自分自身を見てください... ... 静かに自分自身にこの慈愛の言葉を捧げてください... 「私が幸せでありますように... 私が健康でありますように... 私が平和でありますように... 私が安らぎをもって生きられますように...」... これらの願いを心で感じてください... 抵抗に気づいたら... それにも優しくしてください... あなたは愛に値します... 特に自分自身からの愛に......",
      
      breathingCompassion: "呼吸を慈悲の橋として使いましょう... 息を吸うとき... 愛と理解を受け取ってください... 息を吐くとき... 慈悲と優しさを送り出してください... ... 一回一回の呼吸で... 心がより開かれ... より温かくなっていきます... これは自然な愛の状態です... あなたの心の真の本質です......",
      
      lovedOne: "今、あなたが愛する人... 家族や友人... ペットを心に思い浮かべてください... 彼らの顔を見てください... 彼らへの愛を感じてください... ... 静かに彼らに慈愛の言葉を捧げてください... 「あなたが幸せでありますように... あなたが健康でありますように... あなたが平和でありますように... あなたが安らぎをもって生きられますように...」... この愛を感じてください... 心から心へと流れる愛を......",
      
      neutralPerson: "今、中立的な人... 知り合いだが特に近くない人... 店員さんや近所の人を思い浮かべてください... 彼らも幸せを求め苦しみを避けたいのはあなたと同じです... ... 彼らに慈愛を捧げてください... 「あなたが幸せでありますように... あなたが健康でありますように... あなたが平和でありますように... あなたが安らぎをもって生きられますように...」... すべての存在が幸せを求めています......",
      
      difficultPerson: "準備ができたら... 困難な人... あなたとの間に緊張がある人を思い浮かべてください... 彼らも苦しみを抱えています... 彼らも愛されたいのです... ... 無理しないで... できる範囲で... 「あなたが幸せでありますように... あなたが苦しみから解放されますように... あなたが平和でありますように...」... 慈悲は境界を越えて流れます......",
      
      allBeings: "最後に... すべての存在に向けて慈悲を広げてください... あなたの街の人々... 国中の人々... 世界中の人々... すべての生き物... ... 「すべての存在が幸せでありますように... すべての存在が苦しみから解放されますように... すべての存在が平和でありますように...」... 愛には境界がありません... 慈悲は無限に広がります......",
      
      affirmations: "この慈愛の中で... 静かに知ってください... 私は愛に値します... 私は慈悲を与え受け取ることができます... 私の心は愛で満たされています... ... 私は他者の苦しみを理解できます... 私は優しさを選択します... 私は慈悲を通して世界をより良い場所にします... 愛が私の本質です......",
      
      closing: "この慈悲の瞑想を終えるとき... この愛の感覚をあなたの心に保ってください... 一日を通してこの慈愛を持ち歩いてください... ... 困難な瞬間に... この愛に戻ってください... 自分自身に... 他者に... すべての存在に... ... ゆっくりと目を開けてください... 慈愛に満たされ... 平和で... 他者とつながっていることを感じてください... 愛があなたの歩む道を照らしますように......"
    }
  ],

  walking: [
    {
      name: "歩行瞑想の実践",
      intro: "この歩行瞑想へようこそ... この実践はどこでもできます... 室内の静かな空間でも... 外の自然の中でも... 静止して立つことから始めましょう... 足が地面に触れているのを感じてください... 歩行を瞑想に変えていきます...",
      
      preparation: "足を腰幅に開いて立ってください... 足と大地の接触を感じてください... 姿勢に気づいてください... 背筋は伸びているが硬くない... 肩はリラックス... 腕は自然に体の横に垂れて... ... 深呼吸を数回してください... 完全に体に... この瞬間に到着してください... 気づきを持って歩くという意図を設定してください... 一歩一歩が瞑想です......",
      
      liftingStep: "最初の一歩の前に... 右足を持ち上げる準備をしてください... 足を持ち上げる筋肉の微細な準備に気づいてください... ... 今、ゆっくりと右足を持ち上げてください... 「持ち上げ」と心の中で静かに言います... 足の重さを感じてください... バランスが左足に移るのを感じてください... ... 足を前に運んでください... 「運ぶ」と心の中で言います... 空中での足の感覚に気づいてください......",
      
      placingStep: "足を地面に置く準備をしてください... 床や地面に触れる瞬間に気づいてください... 「置く」と心の中で言います... ... 足が地面に完全に触れたら... 体重を右足に移してください... 「移す」と心の中で言います... 体重移動の感覚を感じてください... ... 今、左足で同じプロセスを行います... 持ち上げ... 運ぶ... 置く... 移す... 非常にゆっくりと... 完全に意識的に......",
      
      rhythmWalking: "今、歩行の自然なリズムを確立してください... 歩行を呼吸と同調させてください... 吸いながら一歩... 吐きながら一歩... または心地よいリズムで... ... 一歩一歩に完全に存在してください... 足が地面に触れる感覚... 筋肉の協調... バランスの微細な調整... ... 心がさまよったら... 足の感覚に戻ってください... 歩行があなたの瞑想の錨です......",
      
      turningPractice: "道の端に着いたら... 止まって向きを変える準備をしてください... 止まることに気づいてください... 体が静止する感覚... ... ゆっくりと向きを変えてください... 体の動き... 足の位置変化... 新しい方向の感覚に気づいてください... ... 一瞬立ち止まって... 新しい方向への歩行を始める準備をしてください... 再び... 持ち上げ... 運ぶ... 置く... 移す......",
      
      affirmations: "歩きながら... 静かに知ってください... 私は大地とつながっています... 私は現在の瞬間に存在しています... 私は自分の体に気づいています... ... 一歩一歩が瞑想です... 私は動きの中で平和を見つけます... 私は歩行を通して心を静めます... 私は今ここに存在しています......",
      
      closing: "この歩行瞑想を終えるとき... しばらく静止して立ってください... 足が地面に触れている感覚を感じてください... 体全体を感じてください... ... この気づきの質を日常の歩行に持ち込むことができることを知ってください... 急いでいるときでも... 一歩一歩に少しの気づきを持ち込めます... ... 深呼吸をしてください... 歩行瞑想の実践に感謝してください... 動きと静寂の中で平和を見つけました... これを一日に持ち歩いてください......"
    }
  ],

  breathing: [
    {
      name: "完全な呼吸法",
      intro: "この呼吸瞑想へようこそ... 快適な姿勢を見つけてください... 座っても横になっても... 一方の手を胸に... もう一方の手をお腹に置いてください... 意識的な呼吸の完全な力を探求していきます... あなたの呼吸は常に利用可能です... 常に中心に戻り静める準備ができています...",
      
      naturalBreath: "まず自然な呼吸を観察することから始めましょう... まだ何も変えないで... ただ気づいてください... ... どちらの手がより動くか感じてください... 胸かお腹か... リズムに気づいてください... 深さ... 吸気と呼気の間の間... ... あなたの呼吸は現在の状態を反映しています... そして呼吸を変えることで... 感じ方を変えることができます... これがあなたの超能力です......",
      
      completeBreath: "今、完全な呼吸の技法を学びましょう... 最初にすべての息を吐き切ってください... 肺を空にしてください... ... 今、お腹の手の下から息を吸い始めてください... お腹が膨らむのを感じてください... 胸の手はまだ動かないでください... ... 続けて吸い続けて... 中間の肋骨が広がるのを感じてください... 最後に胸の手の下が上がります... これが完全な吸気です......",
      
      completeExhale: "今、完全に息を吐きましょう... 胸の手の下から始まって... 上の肺から息を吐き始めてください... ... 中間の肋骨が縮まるのを感じながら続けて... 最後にお腹の手の下を軽く押して... 残っている息をすべて吐き切ってください... ... これが完全な呼吸サイクルです... 体全体が呼吸に参加しています......",
      
      rhythmicBreathing: "今、リズミカルな呼吸を確立しましょう... 四つ数えながら完全に息を吸ってください... いち... に... さん... よん... ... 二つ数えながら息を保持してください... いち... に... ... 六つ数えながら完全に息を吐いてください... いち... に... さん... よん... ご... ろく... ... このリズムを続けてください... より長い呼気が深いリラクゼーションを促進します......",
      
      energizingBreath: "今、エネルギーを高める呼吸を試してみましょう... 鼻から素早く三回息を吸って... 一回で長く吐いてください... 吸、吸、吸... 吐〜... ... これを三回繰り返してください... 体が目覚め警戒するのを感じてください... ... 今、自然な呼吸に戻してください... エネルギーが循環しているのを感じてください......",
      
      calmingBreath: "今、神経系を静める呼吸を試してみましょう... 四つ数えながら息を吸ってください... 七つ数えながら息を保持してください... 八つ数えながら息を吐いてください... ... 4-7-8の呼吸パターンです... 長い呼気が副交感神経系を活性化します... 「休息と消化」のシステムです... ... 数回繰り返してください... より深い静けさを感じてください......",
      
      affirmations: "呼吸を続けながら... 静かに知ってください... 私の呼吸は生命力です... 私は呼吸を通して心を静めることができます... 私は呼吸を通してエネルギーを得ることができます... ... 私の呼吸は常に私と共にあります... 私は呼吸を通して現在の瞬間にいます... 私は呼吸の力を信頼します... 私は呼吸を通して平和を見つけます......",
      
      closing: "この呼吸の実践を終えるとき... 自然な呼吸に戻してください... 今、あなたの呼吸がどのように感じられるか気づいてください... ... この完全な呼吸の技法を一日を通して使えることを知ってください... ストレスを感じるとき... エネルギーが必要なとき... 静けさを求めるとき... ... 深呼吸をしてください... 呼吸の実践に感謝してください... あなたの呼吸は常にあなたを現在の瞬間に... 平和に... 中心に導いてくれます... 呼吸と共に歩んでください......"
    }
  ],

  morning: [
    {
      name: "夜明けの目覚めの実践",
      intro: "この朝の瞑想へようこそ... 一日を始める美しい方法です... 快適に座ってください... 朝の光を感じることができる窓の近くでもいいでしょう... 前に横たわる一日のために前向きな意図を設定します... 体と精神の両方を目覚めさせます...",
      
      gratitude: "目覚めたことに感謝する瞬間を取ることから始めましょう... 新しい一日の贈り物を... 呼吸できることを... 感じられることを... 愛し愛されることを... ... 心に浮かぶ感謝の気持ちをすべて認めてください... 小さなことでも... 昨日の良い瞬間... 今日の可能性... ... 感謝は心を開き一日を美しく始めます......",
      
      bodyAwakening: "今、体を穏やかに目覚めさせましょう... 首と肩をゆっくり回してください... 背筋を伸ばし胸を開いてください... ... 腕を頭上に伸ばし大きく伸びをしてください... 体の各部分が目覚めるのを感じてください... ... 足と手の指を動かしてください... 体の生命力を感じてください... あなたは生きています... 意識しています... 新しい一日に準備ができています......",
      
      breathingEnergy: "エネルギーを高める呼吸を行いましょう... 鼻から深く息を吸い... 新鮮な朝の空気を感じてください... 口から完全に息を吐き... 昨夜の重さを解放してください... ... 再び吸ってください... 明晰さと活力を吸い込んで... 吐いて... 眠気や疲労を吐き出してください... ... もう一度... 可能性のエネルギーを吸い込んで... 吐いて... 抵抗や疑いを吐き出してください......",
      
      intentionSetting: "今、一日のための意図を設定しましょう... 今日どのような人になりたいですか？... どのような気持ちで一日を過ごしたいですか？... ... 今日の目標や希望を心に浮かべてください... でも結果に執着しないでください... むしろ今日をどのように体験したいかに焦点を当ててください... ... 一日を通してあなたを導く言葉やフレーズを選んでください... 平和... 喜び... 思いやり... 勇気... 何でも今日のあなたにとって意味があるもの......",
      
      visualization: "この意図を持って一日を生きている自分を想像してください... 朝の活動を意識的に行っている自分を見てください... 他の人々と温かく関わっている自分を... 課題を平静と知恵で扱っている自分を... ... 一日を通して感謝と存在感を保っている自分を想像してください... 困難な瞬間でも... この朝の平和を思い出している自分を... ... この日がどのように展開するかに関係なく... あなたは内側に平和を持っています......",
      
      affirmations: "この新しい一日を迎えるとき... 確信を持って繰り返してください... 私は新しい一日の贈り物に感謝します... 私は意識的に一日を生きます... 私は平和と喜びを選択します... ... 私は今日の課題に対処する力を持っています... 私は他者に思いやりを持ちます... 私は学び成長する機会を受け入れます... ... 私は今日を美しく生きます... 私は自分の光を世界に輝かせます... 私は愛と平和の中で歩みます......",
      
      closing: "この朝の瞑想を終えるとき... この平和と意図を心に保ってください... 一日を通してこの静けさに戻ることができることを知ってください... ... 深呼吸をしてください... 体を伸ばしてください... 準備ができたら目を開けてください... ... 新しい一日に足を踏み出してください... 感謝と目的を持って... 平和で... 意識的で... 一日があなたにもたらすすべてに開かれて... 美しい一日となりますように......"
    }
  ]
  },

  ko: {
    sleep: [
    {
      name: "바디스캔 수면 명상",
      intro: "깊은 잠을 위한 명상에 오신 것을 환영합니다... 침대에 편안하게 누워서 몸이 매트리스에 완전히 이완되도록 하세요... 부드럽게 눈을 감고 호흡에 주의를 기울이기 시작하세요... 지금은 아무것도 할 필요가 없습니다. 그저 편안히 이완하며 제 목소리를 들어주세요...",
      
      breathing: "차분한 호흡부터 시작해보겠습니다... 코로 천천히 숨을 들이마시며 다섯을 세어주세요... 하나... 둘... 셋... 넷... 다섯... 부드럽게 숨을 멈추고 다섯을 세어주세요... 하나... 둘... 셋... 넷... 다섯... 이제 입으로 천천히 숨을 내쉬며 다섯을 세어주세요... 하나... 둘... 셋... 넷... 다섯... 호흡이 자연스러운 리듬으로 돌아가도록 하세요... 매 호흡마다 더 깊은 이완을 느끼세요......",
      
      bodyRelaxation: "이제 긴장을 풀어주기 위해 부드러운 바디스캔을 해보겠습니다... 먼저 발에 주의를 기울여주세요... 발이 무겁고 따뜻해지는 것을 느껴보세요... 이 무거움이 발목을 통해 위로 올라가는 것을 느껴주세요... 종아리... 무릎... 다리가 침대 속으로 더 깊이 가라앉는 것을 느껴보세요... ... 이제 엉덩이와 허리에 주의를 기울여주세요... 그것들이 부드러워지고 이완되는 것을 느껴보세요... 배가 호흡과 함께 오르내리는 것을 느껴보세요... 가슴이 부드럽게 확장됩니다... ... 어깨에 주의를 기울여주세요... 어깨를 귀에서 떨어뜨리듯 내려주세요... 팔의 무게를 느껴보세요... 무겁고 이완된 상태로... 손이 조용히 쉬고 있습니다... ... 목에 주의를 기울여주세요... 목이 늘어나고 부드러워지는 것을 느껴보세요... 턱이 이완됩니다... 얼굴이 이완됩니다... 심지어 눈 주위의 작은 근육들도 모두 놓아줍니다......",
      
      visualization: "평화로운 장소에 있는 자신을 상상해보세요... 아마도 당신은 부드러운 구름 위에 누워... 별이 빛나는 하늘을 부드럽게 떠다니고 있을지도 모릅니다... 또는 아름다운 정원에서 쉬고 있을지도 모릅니다... 부드러운 라벤더 향기에 둘러싸여... 공기의 온도가 완벽합니다... 당신은 완전히 안전하고 보호받고 있다고 느낍니다... ... 매 호흡마다 당신은 더 깊은 이완 속으로 빠져듭니다... 당신의 마음이 고요하고 평화로워집니다... 달을 비추는 고요한 호수처럼... 떠오르는 어떤 생각도 구름처럼 흘러가 버립니다... 무언가를 붙잡을 필요가 없습니다......",
      
      affirmations: "이 완벽한 평화 속에서 쉬면서 알아주세요... 당신은 안전합니다... 당신은 따뜻합니다... 당신은 보호받고 있습니다... 당신은 사랑받고 있습니다... ... 당신의 몸은 잠드는 방법을 알고 있습니다... 이제 모든 것을 놓아도 안전합니다... 당신은 이 휴식을 받을 자격이 있습니다... 내일은 스스로 돌봐질 것입니다... ... 바로 이 순간, 모든 것이 있어야 할 곳에 있습니다......",
      
      closing: "이 평화로운 상태에서 계속 쉬세요... 당신의 몸은 무겁고 이완되어 있습니다... 당신의 마음은 고요하고 평화롭습니다... 매 호흡마다 당신은 더 평온한 잠 속으로 빠져듭니다... ... 이제 당신을 평화로운 꿈 속으로 떠나보내겠습니다... 편히 주무세요... 깊이 쉬세요... 그리고 일어날 때가 되면 상쾌하게 깨어나세요... 좋은 꿈 꾸세요......"
    },
    
    {
      name: "파도소리 수면 명상",
      intro: "마음을 진정시키는 바다 수면 명상에 오신 것을 환영합니다... 침대에 편안하게 자리를 잡고 완전히 편안하게 만드세요... 눈을 감고 석양의 아름다운 해변에 누워 있다고 상상해보세요... 부드러운 파도 소리가 당신을 평화로운 잠으로 안내해줄 것입니다...",
      
      breathing: "깊은 호흡부터 시작하세요... 신선한 바다 공기를 들이마시세요... 그것이 당신의 폐를 완전히 채우는 것을 느껴보세요... 천천히 숨을 내쉬세요... 하루의 모든 긴장을 놓아주면서... ... 파도의 리듬을 들어보세요... 들이마시고... 내쉬고... 들이마시고... 내쉬고... 당신의 호흡이 이 자연스러운 리듬에 맞춰지도록 하세요... 매 호흡마다 당신을 더 깊은 이완으로 이끕니다......",
      
      oceanVisualization: "따뜻하고 부드러운 모래 위에 누워 있는 자신을 상상해보세요... 태양이 지고 있어 하늘을 아름다운 색깔로 물들이고 있습니다... 당신은 부드러운 파도 소리가 해변에 밀려오는 것을 듣고 있습니다... 하나하나의 파도가 당신의 걱정과 스트레스를 가져가 줍니다... ... 따뜻한 모래가 당신의 몸을 받쳐주는 것을 느껴보세요... 부드러운 바다 바람이 당신의 피부를 어루만지고 있습니다... 여기서 당신은 완전히 안전하고 평화롭습니다... ... 밀려오는 파도마다 당신은 더 졸리고... 더 이완됩니다... 바다가 당신에게 자장가를 불러주고 있습니다......",
      
      bodyRelaxation: "이제 파도가 당신의 몸을 씻어주는 것을 느껴보세요... 발부터 시작해서... 발이 젖은 모래처럼 무거워지는 것을 느껴보세요... 파도가 당신의 다리를 흘러... 완전히 이완되고 무겁게 만듭니다... ... 부드러운 물이 엉덩이와 허리를 흘러갑니다... 모든 긴장이 조수에 다듬어진 모래처럼 녹아 사라집니다... 팔이 평화롭게 떠다닙니다... 무겁고 이완되어... ... 파도가 가슴을... 어깨를... 목을 씻어주는 것을 느껴보세요... 얼굴이 부드럽고 평화로워집니다... 완전히 이완되어......",
      
      affirmations: "파도마다 당신은 알고 있습니다... 당신은 안전하고 보호받고 있습니다... 바다가 당신을 부드럽게 품어주고 있습니다... 당신은 완벽한 평화 속에 있습니다... ... 당신의 몸은 깊고 회복적인 잠을 위해 준비되어 있습니다... 파도가 모든 걱정을 가져가 줍니다... 내일은 새로운 가능성을 가져다줄 것입니다... ... 지금 이 순간에는 평화만이... 휴식만이... 부드러운 파도 소리만이 있습니다......",
      
      closing: "이 평화로운 해변에서 계속 쉬세요... 파도가 부드러운 리듬을 계속하고 있습니다... 당신을 잠으로 흔들어 주면서... ... 바다의 소리가 당신을 아름다운 꿈으로 데려가게 하세요... 깊이 주무세요... 완전히 쉬세요... 그리고 바다 위의 새벽처럼 상쾌하게 깨어나세요... 좋은 꿈 꾸세요......"
    }
  ],

  stress: [
    {
      name: "마음챙김 스트레스 해소",
      intro: "스트레스 해소 명상에 오신 것을 환영합니다... 편안한 앉은 자세를 찾아서 등을 곧게 세우되 긴장하지는 마세요... 발을 바닥에 평평하게 놓고 땅의 지지를 느껴보세요... 부드럽게 손을 무릎 위에 놓으세요... 준비가 되면 눈을 감거나 부드럽게 아래를 내려다보세요...",
      
      breathing: "몇 번의 깊은 정화 호흡부터 시작하겠습니다... 코로 숨을 들이마시며 폐를 완전히 채우세요... 입으로 숨을 내쉬며 모든 긴장을 놓아주세요... ... 다시 깊게 숨을 들이마시세요... 가슴과 배가 확장되는 것을 느껴보세요... 그리고 숨을 내쉬세요... 스트레스와 걱정을 놓아주면서... 한 번 더... 신선하고 진정시키는 에너지를 들이마시고... 더 이상 당신에게 도움이 되지 않는 모든 것을 내뱉으세요......",
      
      stressAcknowledgment: "이제 당신이 지고 있는 모든 스트레스나 긴장을 부드럽게 인정해주세요... 이런 감정들을 판단하지 마세요... 그저 친절한 마음으로 알아차리기만 하세요... 스트레스는 자연스러운 것입니다... 이것은 몸이 도전에 반응하는 방식입니다... ... 이 스트레스를 당신 마음의 하늘에 있는 구름으로 상상해보세요... 구름은 왔다가 갑니다... 구름은 하늘이 아닙니다... 당신이 하늘입니다... 광활하고 열려있고 평화로운......",
      
      breathingFocus: "이제 당신의 호흡에 부드러운 주의를 기울여주세요... 들숨과 날숨의 자연스러운 흐름을 알아차리세요... 매 들숨마다 평온과 명료함이 옵니다... 매 날숨마다 긴장과 스트레스가 풀려납니다... ... 만약 마음이 걱정으로 산만해진다면 부드럽게 주의를 호흡으로 되돌리세요... 이것이 당신의 닻입니다... 현재 순간에서의 당신의 안전한 장소입니다......",
      
      bodyRelease: "머리 꼭대기부터 발끝까지 몸을 스캔해보세요... 긴장이나 경직이 있는 부분을 알아차리세요... 이런 부분들로 호흡을 보내주세요... 매 날숨마다 긴장이 녹아 사라지는 것을 상상해보세요... ... 특히 어깨에 주의를 기울여주세요... 스트레스가 종종 여기에 머물러 있습니다... 어깨를 귀에서 떨어뜨리듯... 부드럽게 이완시켜주세요... 해방감을 느껴보세요......",
      
      affirmations: "이 차분한 리듬으로 호흡하는 동안 부드럽게 반복하세요... 나는 평온합니다... 나는 안전합니다... 이 순간은 지나갈 것입니다... 나에게는 필요한 모든 것이 있습니다... ... 나는 스트레스 대신 평화를 선택합니다... 나는 혼란 대신 명료함을 선택합니다... 나는 걱정 대신 현재를 선택합니다... ... 매 들숨마다 나에게 힘이 옵니다... 매 날숨마다 내가 필요 없는 것들을 놓아줍니다......",
      
      closing: "이 평화로운 상태에 계속 앉아 있으세요... 호흡은 자연스럽고 차분합니다... 몸은 이완되고 부드럽습니다... ... 이 평온함의 느낌을 당신의 하루로 가져가세요... 언제든지 이 호흡으로 돌아올 수 있다는 것을 기억하세요... 이것이 당신의 평화의 원천입니다... 언제나 당신에게 사용 가능합니다... 준비가 되면 부드럽게 눈을 뜨세요......"
    }
  ],

  focus: [
    {
      name: "집중력 향상 명상",
      intro: "집중력과 주의력을 향상시키는 명상에 오신 것을 환영합니다... 등을 곧게 세우고 편안하게 앉으세요... 발을 바닥에 놓고 어깨를 이완시키세요... 손을 편안하게 무릎 위에 놓으세요... 준비가 되면 부드럽게 눈을 감으세요...",
      
      breathing: "호흡 리듬을 설정하는 것부터 시작하겠습니다... 네 박자를 세며 숨을 들이마시세요... 하나... 둘... 셋... 넷... 두 박자를 세며 숨을 멈추세요... 하나... 둘... 네 박자를 세며 숨을 내쉬세요... 하나... 둘... 셋... 넷... ... 이 리듬을 계속하세요... 마음이 이 단순한 연습에 맞춰지도록 하세요... 호흡이 당신의 집중점이 됩니다......",
      
      mindTraining: "마음은 자연스럽게 방황합니다... 이것은 정상적인 것입니다... 생각이 산만해졌다는 것을 알아차렸을 때 판단하지 말고 부드럽게 주의를 호흡으로 되돌리세요... 이것은 주의력의 근육을 훈련하는 것과 같습니다... ... 집중을 되찾을 때마다 당신은 집중 능력을 강화하고 있습니다... 마음이 방황하는 것은 실패가 아닙니다... 그것은 연습의 기회입니다......",
      
      singlePointFocus: "이제 하나의 집중점을 선택하세요... 그것은 코에서의 호흡 감각일 수도... 배의 오르내림일 수도... 호흡 소리일 수도 있습니다... ... 모든 주의를 이 한 점에 향하게 하세요... 마음이 다른 생각, 소리, 감각으로 산만해질 때 부드럽게 선택한 점으로 되돌리세요... ... 이것은 한 점 집중의 연습입니다... 모든 형태의 집중의 기초입니다......",
      
      concentration: "마음이 더 집중되고... 더 명료해지는 것을 느껴보세요... 주의력의 질을 알아차리세요... 그것이 한 방향으로 향할 때 자연스러운 가벼움과 평온이 나타납니다... ... 당신이 여기서 발달시키고 있는 이 집중 능력은 인생의 모든 측면으로 전이됩니다... 일, 관계, 창의성... ... 현재에 있는 매 순간이 당신의 집중을 유지하는 능력을 강화합니다......",
      
      affirmations: "집중하며 계속 호흡하는 동안... 알아주세요... 내 마음은 명료하고 집중되어 있습니다... 나는 선택에 따라 주의를 향하게 할 수 있습니다... 나는 이 순간에 현재하고 있습니다... ... 집중은 내가 발달시키고 있는 기술입니다... 연습할 때마다 나는 더 집중하게 됩니다... 나에게는 내 마음을 이끌 힘이 있습니다......",
      
      closing: "집중점에서 의식을 천천히 확장하세요... 방의 소리들을 포함하세요... 의자에 앉아 있는 몸의 감각을... ... 이 명료하고 집중된 주의력의 질을 당신의 하루로 가져가세요... 언제든지 중심을 잡기 위해 호흡으로 돌아올 수 있다는 것을 기억하세요... ... 준비가 되면 부드럽게 눈을 뜨세요... 명료하고 집중되고 현재하고 있다고 느끼면서......"
    }
  ],

  anxiety: [
    {
      name: "불안 완화 명상",
      intro: "불안을 다루는 명상에 오신 것을 환영합니다... 안전하고 편안한 곳에 앉으세요... 발을 바닥에 놓고 대지의 지지를 느껴보세요... 한 손은 심장에, 다른 한 손은 배에 놓으세요... 눈을 감거나 부드럽게 시선을 아래로 향하세요...",
      
      grounding: "현재 순간에 뿌리내리는 것부터 시작하겠습니다... 당신의 몸과 의자의 접촉점을 느껴보세요... 바닥의 발... 몸 위의 손... ... 당신은 여기 있습니다... 당신은 안전합니다... 이 순간 모든 것이 괜찮습니다... 몇 번의 깊은 호흡을 하며 스스로에게 상기시키세요: '나는 여기 있다, 나는 안전하다'......",
      
      breathingForAnxiety: "이제 신경계를 진정시키기 위해 호흡을 사용하겠습니다... 네 박자를 세며 천천히 숨을 들이마시세요... 하나... 둘... 셋... 넷... 네 박자를 세며 숨을 멈추세요... 하나... 둘... 셋... 넷... 여섯 박자를 세며 천천히 숨을 내쉬세요... 하나... 둘... 셋... 넷... 다섯... 여섯... ... 긴 날숨은 부교감신경계를 활성화합니다... '휴식과 회복' 시스템을... 이 리듬을 계속하세요......",
      
      anxietyAcknowledgment: "존재하는 모든 불안을 부드럽게 인정해주세요... 그것을 쫓아내려 하지 마세요... 그저 자비로운 마음으로 알아차리세요... 불안은 종종 우리를 보호하려고 합니다... 그 돌봄의 시도에 감사하세요... ... 불안에게 말하세요: '돌봐줘서 고마워... 지금 이 순간 나는 안전해... 지금 이 순간 모든 것이 괜찮아'... ... 불안을 파도로 상상해보세요... 파도는 일어났다가 가라앉습니다... 그것들은 영원히 지속되지 않습니다......",
      
      bodyCalming: "몸에서 불안을 느끼는 부분에 주의를 기울여주세요... 그것은 가슴, 배, 또는 목일 수 있습니다... 이런 부분들로 부드럽게 호흡을 보내주세요... ... 매 들숨마다 따뜻한 황금빛이 이런 곳들로 들어오는 것을 상상해보세요... 빛이 평온과 치유를 가져다줍니다... 매 날숨마다 긴장과 불안이 녹아 사라집니다......",
      
      affirmations: "진정시키는 리듬으로 계속 호흡하는 동안... 부드럽게 반복하세요... 이 순간은 지나갈 것입니다... 나에게는 그것을 다룰 수 있는 모든 것이 있습니다... 나는 내 불안보다 강합니다... ... 나는 평화를 선택합니다... 나는 차분함을 선택합니다... 나는 삶을 신뢰하기를 선택합니다... 매 들숨마다 평화가 옵니다... 매 날숨마다 두려움을 놓아줍니다......",
      
      closing: "이 평온한 상태에 계속 앉아 있으세요... 호흡은 느리고 깊습니다... 몸은 더 이완되어 있습니다... 마음은 더 평화롭습니다... ... 이런 도구들이 항상 당신과 함께 있다는 것을 기억하세요... 진정이 필요할 때 호흡으로 돌아오세요... 당신은 생각보다 강합니다... ... 준비가 되면 부드럽게 눈을 뜨세요... 이 평온함을 당신과 함께 가져가세요......"
    }
  ],

  energy: [
    {
      name: "아침 활력 명상",
      intro: "활력을 주는 명상에 오신 것을 환영합니다... 가슴을 열고 머리를 들어 똑바로 앉으세요... 발을 바닥에 단단히 놓으세요... 손바닥을 위로 향하게 해서 무릎 위에 놓으세요... 눈을 감고 에너지를 받을 준비가 되었다고 느끼세요...",
      
      energizingBreath: "에너지를 깨우는 호흡부터 시작하겠습니다... 코로 깊게 숨을 들이마시며 배를 채우세요... 그다음 입으로 빠르고 강하게 숨을 내쉬세요... 이것을 세 번 반복하세요... ... 이제 자연스러운 호흡으로 돌아가세요... 몸이 이미 더 경계하고... 더 활력이 넘치는 것을 알아차리세요......",
      
      bodyActivation: "가슴 중앙에 밝은 황금빛이 있다고 상상해보세요... 이것이 당신의 내면 에너지 원천입니다... 매 들숨마다 빛이 더 밝아지고... 더 강해집니다... ... 이제 이 빛을 척추를 따라 아래로 안내하세요... 각 척추골에 에너지를 충전시킵니다... 에너지가 다리로 흘러들어가는 것을 느껴보세요... 당신에게 힘의 기반을 줍니다... ... 빛을 목을 통해 머리로 위쪽으로 안내하세요... 마음의 명료함을 깨웁니다... 그다음 팔로 아래쪽으로 흘러보내세요... 행동의 힘으로 채웁니다......",
      
      vitality: "이 생명 에너지가 온몸을 순환하는 것을 느껴보세요... 이것이 당신의 자연스러운 힘입니다... 당신의 타고난 활력입니다... 그것은 언제나 당신에게 사용 가능합니다... ... 이 에너지가 당신의 몸에서 방사되는 것을 상상해보세요... 힘과 자신감의 빛나는 오라를 만들어냅니다... 당신은 활력이 넘치고... 경계하며... 하루를 위해 준비되었다고 느낍니다......",
      
      intention: "이제 하루를 위한 의도를 설정하세요... 당신은 이 에너지를 어떻게 사용하고 싶나요?... 어떤 목표가 당신에게 중요한가요?... 내면에서 일어나는 동기와 열정을 느껴보세요... ... 이 에너지로 하루를 살아가는 자신을 시각화해보세요... 과제들을 쉽게 해결하고... 힘과 기쁨의 자리에서 다른 사람들과 상호작용하는 모습을......",
      
      affirmations: "에너지가 계속 순환하는 동안... 확신을 가지고 반복하세요... 나는 생명력으로 가득 차 있습니다... 나에게는 중요한 일들을 위한 에너지가 있습니다... 나는 열정을 가지고 하루에 접근합니다... ... 내 몸은 강하고 건강합니다... 내 마음은 명료하고 집중되어 있습니다... 내 마음은 가능성에 열려 있습니다... 나는 긍정적인 에너지를 방사합니다......",
      
      closing: "천천히 손가락과 발가락을 움직이기 시작하세요... 조심스럽게 머리를 좌우로 돌려보세요... 하늘을 향해 스트레칭하세요... ... 눈을 뜨고 완전히 깨어났고... 활력이 넘치며... 하루를 위해 준비되었다고 느끼세요... 이 에너지를 당신과 함께 가져가세요... 동기가 필요할 때 그것으로 돌아오세요... 당신에게는 멋진 하루를 위해 필요한 모든 것이 있습니다......"
    }
  ],

  mindfulness: [
    {
      name: "현재 순간의 깨달음",
      intro: "마음챙김 명상에 오신 것을 환영합니다... 편안하고 안정된 자세로 앉으세요... 등을 곧게 세우되 긴장하지는 마세요... 발을 바닥에 평평하게 놓고 손을 편안하게 무릎 위에 놓으세요... 부드럽게 눈을 감고 현재 순간에 도착하세요...",
      
      breathing: "호흡에 주의를 기울이는 것부터 시작하겠습니다... 호흡을 바꾸려고 하지 마세요... 그저 있는 그대로 관찰하세요... 공기가 콧구멍으로 들어오는 것을 느끼세요... 차갑고 신선한 공기가... 그리고 따뜻한 공기가 나가는 것을... ... 호흡의 자연스러운 리듬을 따라가세요... 들숨... 날숨... 들숨... 날숨... 이것이 현재 순간의 닻입니다......",
      
      presentMoment: "지금 이 순간에 완전히 도착하세요... 과거는 기억 속에만 존재합니다... 미래는 상상 속에만 존재합니다... 삶은 오직 지금 이 순간에만 일어납니다... ... 몸의 감각을 알아차리세요... 의자에 앉아 있는 느낌... 공기의 온도... 옷이 피부에 닿는 느낌... 이 모든 것이 현재 순간의 선물입니다......",
      
      awareness: "주변의 소리에 귀 기울여보세요... 그것들을 판단하지 마세요... 그저 들어보세요... 가까운 소리... 먼 소리... 소리들이 나타났다가 사라지는 것을 관찰하세요... ... 생각이 나타나면 그것들도 소리처럼 관찰하세요... 생각에 휩쓸리지 말고... 그저 구름이 하늘을 지나가는 것처럼 지나가도록 하세요... 당신은 생각이 아닙니다... 당신은 생각을 관찰하는 의식입니다......",
      
      mindfulObservation: "마음의 활동을 부드럽게 관찰하세요... 판단하지 마세요... 그저 호기심을 가지고 지켜보세요... 감정이 일어나면 그것을 환영하세요... '아, 슬픔이 여기 있구나' 또는 '기쁨이 나타났구나'... ... 모든 경험이 일시적임을 알아차리세요... 즐거운 것도... 불편한 것도... 모든 것이 변화합니다... 이것이 삶의 자연스러운 흐름입니다......",
      
      affirmations: "마음챙김의 자세로 계속 호흡하며... 부드럽게 반복하세요... 나는 현재 순간에 있습니다... 나는 깨어있고 의식하고 있습니다... 모든 경험을 환영합니다... ... 나는 내 삶을 완전히 살아갑니다... 매 순간이 새로운 시작입니다... 나는 지금 여기서 평화를 찾습니다......",
      
      closing: "이 마음챙김의 자세를 유지하세요... 호흡은 자연스럽고 편안합니다... 몸은 이완되고 깨어있습니다... 마음은 열려있고 평화롭습니다... ... 이 현재 순간의 의식을 당신의 하루로 가져가세요... 언제든지 호흡으로 돌아와서 지금 여기에 도착할 수 있습니다... ... 준비가 되면 부드럽게 눈을 뜨세요... 현재 순간에 깨어있으면서......"
    }
  ],

  compassion: [
    {
      name: "자비 마음의 실천",
      intro: "자비 명상에 오신 것을 환영합니다... 따뜻하고 편안한 자세로 앉으세요... 한 손을 심장에 놓으세요... 심장의 따뜻함을 느끼세요... 부드럽게 눈을 감고 마음을 사랑과 친절함으로 여세요... 자비는 우리의 자연스러운 본성입니다...",
      
      breathing: "심장 중심에서 호흡하세요... 매 들숨마다 따뜻함과 사랑이 가슴으로 들어옵니다... 매 날숨마다 이 사랑을 세상으로 내보내세요... ... 호흡이 사랑의 파도처럼 흐르도록 하세요... 받고... 주고... 받고... 주고... 이것이 자비의 리듬입니다......",
      
      selfCompassion: "먼저 자신에게 자비를 베풀어보세요... 마음 속으로 자신에게 말해보세요... '내가 행복하기를... 내가 건강하기를... 내가 평화롭기를... 내가 사랑받기를...'... ... 만약 자신에게 자비를 베푸는 것이 어렵다면... 그 어려움도 자비로 대하세요... 자신의 고통을 인정하세요... 당신은 사랑받을 자격이 있습니다......",
      
      lovedOnes: "이제 사랑하는 사람을 마음에 떠올려보세요... 가족... 친구... 반려동물... 그들의 얼굴을 마음에 그려보세요... 그들에게 사랑을 보내세요... '당신이 행복하기를... 당신이 건강하기를... 당신이 평화롭기를... 당신이 사랑받기를...'... ... 이 사랑이 당신의 가슴에서 그들에게로 흘러가는 것을 느끼세요... 따뜻한 황금빛처럼......",
      
      neutralPerson: "이제 중립적인 사람을 떠올려보세요... 아는 사람이지만 특별한 감정이 없는 사람... 상점 직원... 이웃... 동료... 그들도 당신과 같은 인간입니다... 행복을 원하고 고통을 피하고 싶어합니다... ... 그들에게도 같은 자비를 보내세요... '당신이 행복하기를... 당신이 건강하기를... 당신이 평화롭기를... 당신이 사랑받기를...'......",
      
      difficultPerson: "이제... 어려운 사람을 떠올려보세요... 당신에게 상처를 준 사람... 천천히... 강요하지 마세요... 그들도 고통받고 있기 때문에 상처를 준다는 것을 이해하세요... ... 가능한 만큼만... 그들에게도 자비를 보내보세요... '당신이 고통에서 벗어나기를... 당신이 평화를 찾기를...'... 이것이 어렵다면 괜찮습니다... 자비는 연습입니다......",
      
      allBeings: "마지막으로 모든 생명체에게 자비를 확장하세요... 당신의 도시의 모든 사람들... 나라의 모든 사람들... 세계의 모든 존재들... 모든 동물들... ... 마음 속으로 말해보세요... '모든 존재가 행복하기를... 모든 존재가 고통에서 벗어나기를... 모든 존재가 평화롭기를... 모든 존재가 사랑받기를...'... ... 자비의 빛이 당신에게서 모든 방향으로 퍼져나가는 것을 상상하세요......",
      
      closing: "이 자비로운 마음을 유지하세요... 호흡은 사랑으로 가득 차 있습니다... 마음은 따뜻하고 열려있습니다... 당신은 사랑의 원천입니다... ... 이 자비를 당신의 하루로 가져가세요... 자신과 다른 사람들에게 친절하세요... 자비가 세상을 치유합니다... ... 준비가 되면 부드럽게 눈을 뜨세요... 사랑으로 가득 찬 마음으로......"
    }
  ],

  walking: [
    {
      name: "걷기 명상 실천",
      intro: "걷기 명상에 오신 것을 환영합니다... 서서 두 발로 안정되게 서세요... 발이 바닥에 닿아 있는 느낌을 인식하세요... 몸의 균형을 느끼세요... 편안하고 자연스러운 자세로 서서... 걷기를 시작하기 전에 잠시 멈추세요...",
      
      breathing: "서 있는 상태에서 자연스럽게 호흡하세요... 호흡과 몸의 연결을 느끼세요... 매 들숨마다 몸이 살짝 올라가고... 매 날숨마다 몸이 살짝 내려가는 것을 느끼세요... ... 호흡이 움직임의 리듬을 만들어갑니다... 이 리듬이 걷기의 기초가 될 것입니다......",
      
      footAwareness: "왼발의 무게를 느끼세요... 그리고 오른발의 무게를... 무게가 두 발 사이에서 어떻게 분배되는지 관찰하세요... ... 천천히 한 발을 들어올리세요... 발이 바닥에서 떨어지는 감각을 느끼세요... 들어올리기... 앞으로 이동하기... 내려놓기... 각 단계를 의식적으로 경험하세요......",
      
      slowWalking: "매우 천천히 걷기 시작하세요... 일반적인 걷기보다 훨씬 느리게... 매 걸음을 의식적으로 하세요... 들어올리기... 이동하기... 내려놓기... 체중 이동... ... 발바닥이 바닥에 닿는 느낌을 세심히 관찰하세요... 딱딱한 바닥인가요? 부드러운가요? 차가운가요? 따뜻한가요? 모든 감각을 느끼세요......",
      
      bodyInMotion: "걷는 동안 몸 전체를 인식하세요... 다리와 발만이 아니라... 팔이 자연스럽게 흔들리는 것을... 몸통이 균형을 잡는 것을... 머리가 척추 위에서 균형을 잡는 것을... ... 걷기는 전신의 협력입니다... 근육들이 어떻게 함께 작동하는지 느끼세요... 이 놀라운 조화를 감사하세요......",
      
      mindfulSteps: "만약 마음이 산만해지면... 발걸음으로 주의를 되돌리세요... 걸음이 당신의 명상 대상입니다... 각 걸음과 함께 현재 순간으로 돌아오세요... ... 걸음걸음마다 깨어있으세요... 이 순간... 이 걸음... 이 감각... 과거도 미래도 없습니다... 오직 지금 이 걸음만이 있습니다......",
      
      gratitude: "걷는 능력에 감사하세요... 이 다리들이... 이 발들이... 이 몸이 당신을 지탱하고 움직이게 해주는 것에... 지구가 당신을 받쳐주는 것에... ... 매 걸음이 지구와의 만남입니다... 매 걸음이 삶과의 만남입니다... 이 단순한 행위 안에서 기적을 발견하세요......",
      
      closing: "걷기를 천천히 멈추세요... 다시 두 발로 안정되게 서서... 몸의 균형을 느끼세요... 호흡을 인식하세요... 이 걷기 명상의 경험을 마음에 새기세요... ... 일상의 걷기에서도 이 의식을 가져가세요... 매 걸음이 명상이 될 수 있습니다... 매 걸음이 현재 순간으로의 귀환입니다... ... 이 마음챙김 걷기를 당신의 일상 실천으로 만드세요......"
    }
  ],

  breathing: [
    {
      name: "완전한 호흡법",
      intro: "완전한 호흡법 명상에 오신 것을 환영합니다... 편안하고 안정된 자세로 앉으세요... 등을 곧게 세우되 경직되지 않게... 어깨를 이완시키고 턱을 살짝 당기세요... 한 손을 가슴에, 다른 손을 배에 놓으세요... 자연스러운 호흡을 관찰하는 것부터 시작하겠습니다...",
      
      naturalBreath: "지금 있는 그대로의 호흡을 인식하세요... 바꾸려 하지 마세요... 그저 관찰하세요... 들숨의 길이... 날숨의 길이... 호흡 사이의 자연스러운 멈춤... ... 가슴에 있는 손과 배에 있는 손 중 어느 것이 더 많이 움직이는지 느껴보세요... 판단하지 마세요... 그저 알아차리세요......",
      
      abdominalBreath: "이제 배꼽 호흡을 연습해보겠습니다... 배에 있는 손에 집중하세요... 천천히 코로 숨을 들이마시며 배를 부풀려보세요... 가슴은 거의 움직이지 않게 하고... ... 배가 풍선처럼 팽창하는 것을 느끼세요... 그리고 입이나 코로 천천히 숨을 내쉬며 배를 살짝 안쪽으로 당기세요... 이것을 몇 번 반복하세요......",
      
      chestBreath: "이제 가슴 호흡을 연습해보세요... 가슴에 있는 손에 집중하세요... 천천히 숨을 들이마시며 가슴을 확장시키세요... 갈비뼈가 바깥쪽으로 벌어지는 것을 느끼세요... 배는 상대적으로 안정되게 유지하세요... ... 가슴이 넓어지는 것을 느끼세요... 그리고 천천히 숨을 내쉬며 가슴을 이완시키세요... 이것을 몇 번 반복하세요......",
      
      completeBreath: "이제 완전한 호흡을 연습해보겠습니다... 세 단계로 나누어서... 먼저 배로 숨을 들이마시세요... 그다음 가슴으로... 마지막으로 쇄골 부분까지... 하나의 부드러운 흐름으로... ... 배가 먼저 팽창하고... 가슴이 확장되며... 쇄골이 살짝 올라가는 것을 느끼세요... 폐가 완전히 채워지는 것을 상상하세요... ... 이제 역순으로 숨을 내쉬세요... 쇄골부터... 가슴... 그리고 배... 완전히 비워내세요......",
      
      rhythmicBreath: "이제 리듬을 만들어보겠습니다... 네 박자를 세며 들이마시세요... 하나... 둘... 셋... 넷... 두 박자를 세며 숨을 멈추세요... 하나... 둘... 여섯 박자를 세며 천천히 내쉬세요... 하나... 둘... 셋... 넷... 다섯... 여섯... ... 이 리듬이 자연스러워질 때까지 계속하세요... 4-2-6의 리듬... 이것이 진정과 균형을 가져다줍니다......",
      
      breathAwareness: "호흡의 질을 관찰하세요... 부드러운가요? 거친가요? 깊은가요? 얕은가요? 판단하지 마세요... 그저 의식적으로 관찰하세요... ... 공기가 콧구멍으로 들어올 때의 감각... 목을 지날 때... 폐로 들어갈 때... 그리고 같은 길을 따라 나올 때... 호흡의 전체 여정을 의식하세요......",
      
      affirmations: "완전한 호흡을 계속하며... 마음으로 반복하세요... 매 들숨마다 생명력이 옵니다... 매 날숨마다 평화가 옵니다... 나는 호흡과 하나입니다... ... 나의 호흡은 나의 힘의 원천입니다... 나는 깊고 차분하게 호흡합니다... 호흡이 나를 현재 순간에 머물게 합니다......",
      
      closing: "이 완전한 호흡법을 몇 번 더 반복하세요... 각 호흡이 당신을 더 깊은 평온으로 인도합니다... 호흡이 자연스러운 리듬으로 돌아가도록 하세요... ... 이 호흡 기법을 당신의 일상으로 가져가세요... 스트레스를 느낄 때... 집중이 필요할 때... 평온이 필요할 때... 호흡이 항상 당신과 함께 있습니다... ... 준비가 되면 부드럽게 눈을 뜨세요... 호흡의 힘을 기억하며......"
    }
  ],

  morning: [
    {
      name: "새벽 깨어남 실천",
      intro: "새벽 깨어남 명상에 오신 것을 환영합니다... 새로운 하루가 시작되는 이 신성한 시간에... 편안하게 앉아서 밤의 고요함이 낮의 활력으로 변화하는 것을 느끼세요... 부드럽게 눈을 감고 이 전환의 순간을 받아들이세요... 당신은 새로운 시작의 문턱에 서 있습니다...",
      
      breathing: "새벽 공기와 함께 호흡하세요... 공기가 더 신선하고... 더 순수하고... 더 생명력이 넘치는 것을 느끼세요... 천천히 깊게 들이마시세요... 새로운 하루의 가능성을 받아들이면서... ... 숨을 내쉬며 어젯밤의 모든 것을 놓아주세요... 꿈들... 걱정들... 피로... 모든 것을 정화시키는 호흡으로 놓아주세요......",
      
      gratitude: "깨어날 수 있음에 감사하세요... 새로운 하루를 볼 수 있음에... 숨을 쉴 수 있음에... 살아있음에... 이 순간 당신에게 주어진 모든 것에 감사하세요... ... 잠자리에서 깨어나게 해준 몸에 감사하세요... 당신을 보호해준 밤에 감사하세요... 앞으로 펼쳐질 하루에 감사하세요... 감사가 마음을 따뜻하게 채우도록 하세요......",
      
      intention: "이 새로운 하루를 위한 의도를 설정하세요... 오늘 어떤 사람이 되고 싶나요?... 어떤 에너지를 세상에 가져다주고 싶나요?... 어떤 방식으로 살고 싶나요?... ... 마음 깊은 곳에서 일어나는 진정한 의도를 들어보세요... 그것이 무엇이든... 그것을 존중하고 받아들이세요... 이 의도가 하루의 나침반이 되도록 하세요......",
      
      visualization: "오늘 하루를 아름답게 살아가는 자신을 상상해보세요... 평온하고 집중된 마음으로... 다른 사람들과 조화롭게 상호작용하면서... 도전들을 지혜롭게 다루면서... ... 당신이 세상에 긍정적인 영향을 미치는 것을 상상해보세요... 미소로... 친절한 말로... 존재 자체로... 당신의 빛이 다른 사람들의 하루를 밝게 만드는 것을 봅니다......",
      
      energy: "새벽의 에너지를 느끼세요... 세상이 깨어나는 에너지를... 새들의 첫 노래... 바람의 부드러운 속삭임... 빛이 천천히 돌아오는 것... 이 모든 에너지가 당신 안에서도 깨어나고 있습니다... ... 생명력이 몸 전체에 흐르는 것을 느끼세요... 세포 하나하나가 활력으로 깨어나고... 마음이 명료해지며... 정신이 맑아집니다... 당신은 하루를 위해 준비되어 있습니다......",
      
      affirmations: "새벽의 평온함 속에서... 마음으로 확언하세요... 오늘은 새로운 시작입니다... 나에게는 무한한 가능성이 있습니다... 나는 이 하루를 아름답게 살아갈 것입니다... ... 나는 평화로운 마음으로 하루를 시작합니다... 나는 사랑과 친절함을 나누겠습니다... 나는 현재 순간에 깨어있겠습니다... 오늘은 선물입니다......",
      
      closing: "이 새벽 명상을 마무리하면서... 이 평온함과 의도를 마음에 새기세요... 천천히 손가락과 발가락을 움직여보세요... 몸을 부드럽게 깨우세요... ... 눈을 뜨고 새로운 하루를 맞이하세요... 마음은 평온하고... 정신은 명료하며... 몸은 활력이 넘칩니다... 이 새벽의 축복을 하루 종일 기억하세요... ... 아름다운 하루를 시작하세요... 매 순간을 선물로 받아들이며... 당신의 존재 자체가 세상에 빛을 가져다줍니다......"
    }
  ]
  },

  // Arabic meditation templates
  ar: {
    sleep: [
      {
        name: "تأمل للنوم الهادئ",
        intro: "مرحباً بك في هذا التأمل المهدئ للنوم... اجعل نفسك مريحاً في سريرك... دع جسدك ينغمس في الفراش... أغمض عينيك برفق وابدأ في ملاحظة تنفسك... لا يوجد شيء عليك فعله الآن... سوى الاسترخاء والاستماع لصوتي...",
        
        breathing: "لنبدأ ببعض الأنفاس المهدئة... تنفس ببطء من أنفك... عد إلى خمسة... واحد... اثنان... ثلاثة... أربعة... خمسة... احبس أنفاسك برفق... واحد... اثنان... ثلاثة... أربعة... خمسة... والآن أخرج الهواء ببطء من فمك... واحد... اثنان... ثلاثة... أربعة... خمسة... دع تنفسك يعود إلى إيقاعه الطبيعي... تشعر بمزيد من الاسترخاء مع كل نفس......",
        
        bodyRelaxation: "الآن سنقوم بمسح لطيف للجسم لتحرير أي توتر... ابدأ بتوجيه انتباهك إلى قدميك... اشعر بهما يصبحان ثقيلتين ودافئتين... دع هذا الثقل يرتفع عبر كاحليك... ساقيك... ركبتيك... اشعر بساقيك تغوص أعمق في السرير... ... الآن وجه انتباهك إلى وركيك وأسفل ظهرك... دعهما يلينان ويسترخيان... اشعر بمعدتك ترتفع وتنخفض مع كل نفس... صدرك يتمدد برفق... ... اجلب وعيك إلى كتفيك... دعهما يسقطان بعيداً عن أذنيك... اشعر بوزن ذراعيك... ثقيلتان ومسترخيتان... يداك ترتاحان بسلام... ... لاحظ رقبتك... دعها تطول وتلين... فكك يسترخي... وجهك يصبح هادئاً... حتى العضلات الصغيرة حول عينيك تسترخي......",
        
        visualization: "تخيل نفسك في مكان هادئ... ربما أنت مستلق على سحابة ناعمة... تطفو برفق عبر سماء مليئة بالنجوم... أو ربما ترتاح في حديقة جميلة... محاط برائحة اللافندر العطرة... الهواء في درجة الحرارة المثالية... تشعر بالأمان والحماية الكاملة... ... مع كل نفس، تنجرف أعمق في الاسترخاء... عقلك يصبح صامتاً وهادئاً... مثل بحيرة هادئة تعكس القمر... أي فكرة تظهر تطفو ببساطة مثل الغيوم... لا تحتاج للتمسك بأي شيء......",
        
        affirmations: "بينما ترتاح هنا في سلام تام... اعلم أن... أنت في أمان... أنت دافئ... أنت محمي... أنت محبوب... ... جسدك يعرف كيف ينام... من الآمن أن تدع نفسك تذهب الآن... تستحق هذا الراحة... الغد سيعتني بنفسه... ... في هذه اللحظة... في هذا الوقت... كل شيء هو بالضبط كما يجب أن يكون......",
        
        closing: "استمر في الراحة في هذه الحالة الهادئة... جسدك ثقيل ومسترخي... عقلك هادئ وصامت... مع كل نفس، تغوص أعمق في نوم مريح... ... أتركك الآن لتنجرف إلى أحلام هادئة... نم جيداً... استرح عميقاً... واستيقظ منتعشاً عندما يحين الوقت... أحلام حلوة......"
      }
    ],

    stress: [
      {
        name: "تخفيف التوتر بالوعي",
        intro: "مرحباً بك في هذا التأمل لتخفيف التوتر... اجلس في وضع مريح... ظهرك مستقيم لكن غير متصلب... ضع قدميك مسطحتين على الأرض... اشعر بالأرض تحتك... ضع يديك برفق على فخذيك... وعندما تكون مستعداً... أغمض عينيك أو وجه نظرك برفق إلى الأسفل...",
        
        breathing: "لنبدأ بأخذ بعض الأنفاس العميقة والمطهرة... تنفس من أنفك... املأ رئتيك بالكامل... وأخرج الهواء من فمك... حرر أي توتر... ... مرة أخرى... تنفس بعمق... اشعر بصدرك ومعدتك يتمددان... وأخرج الهواء... دع التوتر والقلق يذهبان... مرة أخيرة... تنفس طاقة جديدة ومهدئة... وأخرج كل ما لا يخدمك بعد الآن......",
        
        mindfulness: "دع انتباهك يستقر في اللحظة الحالية... لاحظ الإحساس بتنفسك الذي يدخل ويخرج... الحركة اللطيفة لصعود وهبوط صدرك... ... عندما تظهر أفكار عن يومك... وستظهر... لاحظها ببساطة دون حكم... مثل غيوم تمر في السماء... دعها تنجرف... ... أعد انتباهك إلى تنفسك... هذا هو مرساتك... متاح دائماً... حاضر دائماً... ... لا يوجد شيء عليك حله الآن... لا مشاكل لتحلها... فقط هذا النفس... ثم التالي......",
        
        closing: "بينما نستعد لإنهاء هذا التأمل... اعلم أن هذا الشعور بالهدوء متاح لك دائماً... على بعد أنفاس قليلة فقط... ... ابدأ في تحريك أصابع يديك وقدميك... حرك كتفيك برفق... وعندما تكون مستعداً... افتح عينيك ببطء... ... خذ لحظة لتلاحظ كيف تشعر... احمل هذا السلام معك بينما تكمل يومك... تذكر... يمكنك دائماً العودة إلى هذا المركز الهادئ عندما تحتاجه... شكراً لك على أخذ هذا الوقت لنفسك......"
      }
    ],

    focus: [
      {
        name: "التركيز بالتنفس",
        intro: "مرحباً بك في هذا التأمل للتركيز والانتباه... اجلس براحة مع عمودك الفقري مستقيماً ومتنبهاً... ضع يديك على ركبتيك أو في حضنك... خذ لحظة لوضع نية للوضوح والتركيز... عندما تكون مستعداً... أغمض عينيك برفق...",
        
        breathing: "ابدأ بأخذ ثلاثة أنفاس عميقة ومنشطة... تنفس من أنفك... املأ رئتيك بالهواء النقي... وأخرج الهواء بالكامل من فمك... ... مرة أخرى... استنشق بعمق... تشعر بالتنبه والحيوية... أخرج الهواء بالكامل... حرر أي ضباب ذهني... مرة أخيرة... تنفس الوضوح... أخرج التشتت... ... الآن دع تنفسك يعود إلى الطبيعي... لكن احتفظ بانتباهك على كل نفس......",
        
        concentration: "سنستخدم الآن تنفسك كمرساة لانتباهك... ركز على الإحساس بالهواء الذي يدخل إلى أنفك... بارد عند الاستنشاق... دافئ عند الزفير... ... احتفظ بانتباهك تماماً عند طرف أنفك... حيث تشعر بالتنفس أولاً... ... عندما يتجول عقلك... وسيتجول... لاحظ ببساطة إلى أين ذهب... ثم برفق... دون حكم... أعد انتباهك إلى التنفس... هذه هي الممارسة... ملاحظة... العودة... مراراً وتكراراً......",
        
        affirmations: "كرر ذهنياً هذه التأكيدات للتركيز... 'عقلي واضح وحاد'... ... 'أنا حاضر ومدرك تماماً'... ... 'تركيزي قوي ومستقر'... ... 'أركز بسهولة ووضوح'... ... دع هذه الكلمات تغوص عميقاً في وعيك......",
        
        closing: "بينما ننهي هذا التأمل... اشعر بالوضوح المحسن في عقلك... قدرتك المحسنة على التركيز... ... ابدأ في تعميق تنفسك... حرك أصابع يديك وقدميك... وعندما تكون مستعداً... افتح عينيك... ... لاحظ كم تشعر بالتنبه والتركيز... عقلك واضح... حاد وجاهز... احمل هذا الانتباه المركز إلى نشاطك التالي... أنت مستعد للعمل بدقة ووضوح......"
      }
    ],

    anxiety: [
      {
        name: "تهدئة القلق بالتأريض",
        intro: "مرحباً بك في هذا التأمل لتخفيف القلق... اعثر على وضع مريح حيث تشعر بالدعم والأمان... يمكنك وضع يد على قلبك وأخرى على معدتك... هذا يساعدك على الشعور بالتأريض والاتصال مع نفسك... خذ لحظة للوصول هنا بالكامل...",
        
        grounding: "لنبدأ بالتأريض في اللحظة الحالية... اشعر بقدميك على الأرض... أو جسدك في الكرسي... لاحظ خمسة أشياء يمكنك أن تشعر بها الآن... درجة حرارة الهواء... ملمس ملابسك... وزن جسدك... ... هذا حقيقي... هذا الآن... أنت في أمان في هذه اللحظة......",
        
        breathingTechnique: "الآن سنستخدم نمط تنفس مهدئ... تنفس ببطء لأربع عدات... واحد... اثنان... ثلاثة... أربعة... احبس برفق لأربعة... واحد... اثنان... ثلاثة... أربعة... وأخرج الهواء ببطء لست... واحد... اثنان... ثلاثة... أربعة... خمسة... ستة... ... هذا الزفير الأطول ينشط استجابة الاسترخاء في جسدك... مرة أخرى... داخل لأربعة... احبس لأربعة... خارج لست... ... استمر في هذا الإيقاع المهدئ... تشعر بمزيد من الهدوء مع كل دورة......",
        
        affirmations: "لنقدم لأنفسنا بعض التأكيدات المهدئة... 'أنا في أمان في هذه اللحظة'... ... 'هذا الشعور سيمر'... ... 'لقد نجوت من القلق من قبل وسأنجو مرة أخرى'... ... 'أنا أقوى من قلقي'... ... 'السلام هو حالتي الطبيعية'... ... 'أختار الهدوء'......",
        
        closing: "بينما ننهي هذا التأمل... تذكر أن لديك هذه الأدوات متاحة دائماً... تنفسك... مكانك الآمن... قوتك الداخلية... ... ابدأ في تحريك جسدك برفق... ربما تمدد قليلاً... خذ نفساً عميقاً وافتح عينيك ببطء... ... لاحظ أي تغيير في ما تشعر به... حتى التغيير الصغير مهم... كن لطيفاً مع نفسك بينما تعود إلى يومك... أنت شجاع... أنت قادر... ولست وحدك......"
      }
    ],

    energy: [
      {
        name: "طاقة الشمس الذهبية",
        intro: "مرحباً بك في هذا التأمل المنشط... اجلس أو قف في وضع يشعر بالقوة والتنبه... تخيل حبلاً يسحبك إلى أعلى من قمة رأسك... اشعر بعمودك الفقري يطول... صدرك ينفتح... أنت على وشك إيقاظ حيويتك الطبيعية...",
        
        breathing: "لنبدأ ببعض الأنفاس المنشطة... خذ نفساً عميقاً من أنفك... املأ جسدك كله بالطاقة الجديدة... وأخرج الهواء بقوة من فمك بصوت 'ها'... حرر أي تعب... ... مرة أخرى... تنفس الحيوية والقوة الحيوية... وأخرج 'ها'... دع الكسل يذهب... مرة أخيرة... استنشق القوة والطاقة... أخرج 'ها'... تشعر بمزيد من اليقظة......",
        
        energyVisualization: "تخيل شمساً ذهبية مشرقة في وسط صدرك... هذا هو مصدر طاقتك الداخلية... مع كل نفس... تصبح هذه الشمس أكثر إشراقاً وأكبر... ... اشعر بأشعتها الدافئة تنتشر في جسدك كله... إلى أعلى عبر صدرك وكتفيك... إلى أسفل عبر ذراعيك إلى أطراف أصابعك... التي تنبض بالطاقة... ... الضوء الذهبي يتدفق إلى أعلى عبر حلقك ورأسك... عقلك يصبح واضحاً ومتنبهاً... إلى أسفل عبر معدتك ووركيك... عبر ساقيك... يربطك بالأرض بينما ينشطك... ... جسدك كله يشع بقوة حيوية نابضة......",
        
        affirmations: "لنفعل طاقتك بتأكيدات قوية... 'أنا مملوء بطاقة نابضة'... ... 'جسدي قوي وحي'... ... 'لدي كل الطاقة التي أحتاجها ليومي'... ... 'أنا متحفز وجاهز للعمل'... ... 'الطاقة تتدفق بحرية من خلالي'... ... اشعر بهذه الكلمات تشحن كل خلية في جسدك......",
        
        closing: "بينما ننهي هذا التأمل المنشط... اشعر بالحيوية تجري في عروقك... أنت مستيقظ... متنبه ومشحون بالكامل... ... ابدأ في تحريك جسدك كما يشعر جيداً... ربما مدد ذراعيك فوق رأسك... حرك رقبتك... اقفز برفق على أطراف أصابع قدميك... ... عندما تكون مستعداً... افتح عينيك على نطاق واسع... استقبل العالم بطاقة جديدة... أنت جاهز لاحتضان يومك بحماس وقوة... اذهب ودع نورك يضيء......"
      }
    ],

    mindfulness: [
      {
        name: "وعي اللحظة الحالية",
        intro: "مرحباً بك في هذا التأمل للوعي الكامل... اعثر على وضع مريح حيث يمكنك الجلوس بيقظة وسهولة... هذه الممارسة تتعلق بتنمية الوعي للحظة الحالية... لا يوجد مكان للذهاب إليه ولا شيء لتحقيقه... فقط كن هنا الآن...",
        
        breathing: "لنبدأ بترسيخ أنفسنا في التنفس... لاحظ إيقاع تنفسك الطبيعي... لا تغيره... راقب فقط... ... اشعر بالهواء يدخل عبر أنفك... التوقف الخفيف... والإطلاق اللطيف... ... تنفسك يتكشف دائماً في اللحظة الحالية... استخدمه كمرساتك إلى الهنا والآن... عندما يتجول عقلك... عد ببساطة إلى التنفس... دون حكم... مجرد عودة لطيفة......",
        
        bodyAwareness: "الآن وسع وعيك ليشمل جسدك... لاحظ كيف تجلس... اشعر بنقاط التلامس حيث يلتقي جسدك بالسطح... ... امسح جسدك بفضول لطيف... ما الأحاسيس الموجودة الآن؟... ربما دفء... برودة... توتر... استرخاء... ... لاحظ ببساطة ما هو هناك... دون محاولة تغيير أي شيء... جسدك هو بوابة إلى الحضور......",
        
        thoughtAwareness: "بينما نستمر... لاحظ أي أفكار تظهر... بدلاً من أن تنجر إلى القصة... انظر إن كان بإمكانك مراقبة الأفكار كغيوم تمر في سماء عقلك... ... بعض الأفكار خفيفة وضبابية... أخرى قد تكون غيوم عاصفة ثقيلة... كلها مرحب بها... كلها ستمر... ... أنت لست أفكارك... أنت المساحة الواعية التي تظهر وتختفي فيها الأفكار......",
        
        presentMoment: "في هذه اللحظة بالذات... في هذه اللحظة الدقيقة... كل شيء هو بالضبط كما هو... هناك سلام عميق في قبول ما هو موجود... دون مقاومة... ... استمع إلى الأصوات من حولك... لاحظ أنها تظهر جديدة في كل لحظة... ... اشعر بالحيوية في جسدك... طاقة كونك هنا... الآن... ... هذه اللحظة هي اللحظة الوحيدة الموجودة... وهي تتجدد باستمرار......",
        
        closing: "بينما نختتم هذه الممارسة... خذ لحظة لتقدر أنك أعطيت نفسك هدية الحضور... ... لاحظ كيف تشعر بعد قضاء وقت في الوعي اليقظ... ... عندما تكون مستعداً... افتح عينيك ببطء إذا كانتا مغمضتين... ... انظر إن كان بإمكانك حمل هذه النوعية من الحضور معك... في نشاطك التالي... وطوال يومك... اللحظة الحالية متاحة دائماً... تنتظر دائماً عودتك......"
      }
    ],

    compassion: [
      {
        name: "ممارسة المحبة اللطيفة",
        intro: "مرحباً بك في هذا التأمل للرحمة... استقر في وضع مريح وضع يداً على قلبك... سننمي اللطف المحب... أولاً لنفسك... ثم نمدده للآخرين... هذه ممارسة لفتح القلب...",
        
        selfCompassion: "ابدأ بجلب نفسك إلى الذهن... تخيل نفسك كما أنت الآن... انظر إلى نفسك بعيون لطيفة... كما ستنظر إلى صديق عزيز... ... قدم لنفسك بصمت هذه الكلمات من المحبة اللطيفة... 'عسى أن أكون سعيداً... عسى أن أكون بصحة جيدة... عسى أن أكون في سلام... عسى أن أعيش بسهولة...' ... اشعر بهذه الأمنيات في قلبك... لاحظ أي مقاومة... وكن لطيفاً مع ذلك أيضاً... تستحق الحب... خاصة من نفسك......",
        
        lovedOne: "الآن اجلب إلى الذهن شخصاً تحبه بسهولة... فرد من العائلة... صديق مقرب... حيوان أليف محبوب... انظر إلى وجهه... اشعر بمودتك الطبيعية له... ... مدد نفس الأمنيات المحبة... 'عسى أن تكون سعيداً... عسى أن تكون بصحة جيدة... عسى أن تكون في سلام... عسى أن تعيش بسهولة...' ... اشعر بالدفء في قلبك بينما ترسل له الحب... لاحظ كم هو جيد أن تتمنى الخير لشخص ما......",
        
        neutral: "الآن فكر في شخص محايد... ربما كاشير تراه بانتظام... جار بالكاد تعرفه... شخص ليس صديقاً ولا عدواً... ... مارس مد نفس اللطف... 'عسى أن تكون سعيداً... عسى أن تكون بصحة جيدة... عسى أن تكون في سلام... عسى أن تعيش بسهولة...' ... هذا الشخص يريد أن يكون سعيداً مثلك... يواجه الصراعات مثلك... انظر إن كان بإمكانك الاتصال بإنسانيتكما المشتركة......",
        
        difficult: "إذا كنت تشعر بالاستعداد... اجلب إلى الذهن شخصاً لديك صعوبات معه... ابدأ بشخص صعب قليلاً فقط... ليس الشخص الأصعب في حياتك... ... قد يبدو هذا صعباً... اذهب ببطء... 'عسى أن تكون سعيداً... عسى أن تكون بصحة جيدة... عسى أن تكون في سلام... عسى أن تعيش بسهولة...' ... تذكر... سعادتهم لا تأخذ شيئاً من سعادتك... الأشخاص المجروحون غالباً ما يجرحون الآخرين... هل يمكنك أن تجد رحمة لألمهم؟......",
        
        universal: "أخيراً... وسع وعيك ليشمل كل الكائنات في كل مكان... انظر إلى الأرض من الفضاء... كل المخلوقات... كل البشر... يكافحون ويبحثون عن السعادة... ... بقلب مفتوح... قدم هذا اللطف العالمي... 'عسى أن تكون كل الكائنات سعيدة... عسى أن تكون كل الكائنات بصحة جيدة... عسى أن تكون كل الكائنات في سلام... عسى أن تعيش كل الكائنات بسهولة...' ... اشعر بنفسك كجزء من هذه الشبكة الواسعة من الاتصال... تعطي وتتلقى الحب......",
        
        closing: "ضع يدك على قلبك مرة أخرى... اشعر بالدفء هناك... الحب الذي أنتجته... هذا اللطف يعيش فيك دائماً... ... تذكر... الرحمة الحقيقية تشملك... كن لطيفاً مع نفسك بينما تمر بيومك... ... عندما تلتقي بالآخرين... انظر إن كان بإمكانك تذكر هذا الاتصال القلبي... كل شخص يفعل أفضل ما يمكنه بما لديه... كل شخص يستحق الحب... بدءاً منك......"
      }
    ],

    walking: [
      {
        name: "ممارسة المشي الواعي",
        intro: "مرحباً بك في هذا التأمل للمشي... يمكنك فعل هذه الممارسة في أي مكان... داخل البيت في مساحة هادئة... أو خارجاً في الطبيعة... ابدأ بالوقوف ساكناً... اشعر بقدميك على الأرض... سنحول المشي إلى تأمل...",
        
        preparation: "ابدأ بالوقوف مع قدميك منفصلتين بعرض الوركين... اشعر بالتلامس بين قدميك والأرض... لاحظ وضعيتك... عمودك الفقري مستقيم لكن غير متصلب... كتفاك مسترخيان... ذراعاك متدليان طبيعياً على جانبيك... ... خذ بعض الأنفاس العميقة... وصل بالكامل إلى جسدك... إلى هذه اللحظة... ضع نية للمشي بوعي... كل خطوة تأمل......",
        
        firstSteps: "ابدأ برفع قدمك اليمنى ببطء... لاحظ انتقال الوزن إلى قدمك اليسرى... اشعر بالرفع... الحركة... وضع قدمك... ... خذ كل خطوة بقصد... حوالي نصف سرعة مشيك العادية... لا يوجد وجهة... لا عجلة... فقط الفعل البسيط للمشي... ... لاحظ كيف يتوازن جسدك طبيعياً... ينسق... يتحرك عبر المساحة... تعجب من هذه المعجزة اليومية......",
        
        breathAndSteps: "الآن نسق تنفسك مع خطواتك... ربما خطوتان عند الاستنشاق... خطوتان عند الزفير... اعثر على إيقاع يبدو طبيعياً... ... إذا تجول عقلك إلى وجهتك أو قائمة مهامك... أعد الانتباه برفق إلى الإحساس الجسدي للمشي... إحساس قدميك تلمس الأرض... ترفع... تتحرك للأمام......",
        
        awareness: "وسع وعيك ليشمل بيئتك... إذا كنت بالخارج... لاحظ درجة حرارة الهواء... أي نسيم... أصوات الطبيعة... الطيور... أوراق تحتك... ... إذا كنت بالداخل... كن واعياً للمساحة حولك... الإضاءة... جودة الهواء... ... ابق متصلاً بإحساس المشي بينما تستوعب بيئتك... المشي كرقصة بين الوعي الداخلي والحضور الخارجي......",
        
        gratitude: "بينما تستمر في المشي... اجلب التقدير لهذا الجسد المذهل... ساقاك اللتان تحملانك... قدماك اللتان تدعمانك... توازنك الذي يبقيك مستقراً... ... اشعر بالامتنان لقدرتك على التحرك عبر العالم... ليس كل شخص لديه هذه الهدية... كل خطوة امتياز... ... لاحظ كيف يخلق تأمل المشي ملاذاً متحركاً... السلام في الحركة......",
        
        closing: "بينما ننهي ممارسة المشي هذه... عد إلى الوقوف... اشعر بقدميك بثبات على الأرض... ... خذ لحظة لتقدر هذه الممارسة البسيطة لكن العميقة... يمكنك جلب هذا الوعي إلى أي مشي... تحويل خطوات عادية إلى لحظات تأمل... ... احمل هذا الحضور الواعي معك... في نشاطك التالي... كل خطوة يمكن أن تكون عودة إلى اللحظة الحالية......"
      }
    ],

    breathing: [
      {
        name: "ممارسة التنفس الكامل",
        intro: "مرحباً بك في هذا التأمل للتنفس... اعثر على وضع مريح حيث يمكن أن يكون عمودك الفقري مستقيماً... ضع يداً على صدرك وأخرى على معدتك... سنستكشف التنفس الكامل والواعي...",
        
        naturalBreath: "ابدأ بمراقبة تنفسك الطبيعي... دون تغييره... فقط لاحظه... ... اشعر بالحركة تحت يديك... أي يد تتحرك أكثر؟... معظم الناس يتنفسون بشكل أساسي بالصدر... لكننا سنتعلم التنفس بالجسم كله......",
        
        deepBreathing: "الآن ابدأ بتعميق التنفس برفق... تنفس ببطء من أنفك... اسمح للهواء بملء معدتك أولاً... ... اشعر بيدك على المعدة ترتفع... حجابك الحاجز يتمدد... ... استمر في ملء صدرك... اشعر بيدك على الصدر ترتفع... أضلاعك تتمدد... ... اعمل وقفة لطيفة في قمة الاستنشاق... احتفظ بكل هذه الحيوية... ... الآن أخرج الهواء ببطء... اسمح للهواء بالخروج برفق من صدرك... ثم من معدتك... ... اشعر بجسدك يسترخي مع كل زفير......",
        
        breathCounting: "لنجد الآن إيقاعاً... استنشق لأربع عدات... واحد... اثنان... ثلاثة... أربعة... ... اعمل وقفة لطيفة لعدتين... واحد... اثنان... ... أخرج الهواء لست عدات... واحد... اثنان... ثلاثة... أربعة... خمسة... ستة... ... هذا الزفير الأطول ينشط استجابة الاسترخاء في جسدك... ... استمر في هذا الإيقاع... 4 عدات داخل... 2 وقفة... 6 عدات خارج... اعثر على إيقاعك المريح......",
        
        breathAwareness: "بينما تستمر في هذا التنفس الإيقاعي... لاحظ الأحاسيس الدقيقة... الهواء البارد يدخل... الهواء الدافئ يخرج... ... الوقفة الطبيعية بين الاستنشاق والزفير... السكون... السلام... ... اشعر بكيف يهدئ هذا التنفس الواعي جهازك العصبي... يهدئ عقلك... يسترخي جسدك... ... كل نفس هو هدية... فرصة للعودة إلى الحاضر......",
        
        affirmations: "مع كل استنشاق... تنفس هذه الصفات... 'أتنفس السلام'... ... 'أتنفس الوضوح'... ... 'أتنفس الحيوية'... ... مع كل زفير... اترك... 'أزفر التوتر'... ... 'أزفر القلق'... ... 'أزفر كل ما لا يخدمني بعد الآن'...",
        
        closing: "بينما ننهي ممارسة التنفس هذه... دع تنفسك يعود إلى الطبيعي... لكن احتفظ بهذا الوعي للنفس... ... لاحظ كيف تشعر... أكثر هدوءاً... أكثر تركيزاً... أكثر حيوية... ... تذكر... تنفسك معك دائماً... أداة ثابتة للسلام والحضور... ... كلما شعرت بالتوتر أو التشتت... يمكنك العودة إلى هذا التنفس الواعي... تنفسك هو بيتك......"
      }
    ],

    morning: [
      {
        name: "ممارسة الاستيقاظ الفجري",
        intro: "مرحباً بك في هذا التأمل الصباحي... بينما تبدأ يومك... خذ هذا الوقت للاستيقاظ برفق... ليس فقط جسدك... لكن عقلك وقلبك أيضاً... كل صباح هو ولادة جديدة... فرصة للبدء من جديد...",
        
        awakening: "ابدأ بتمديد جسدك برفق... ارفع ذراعيك فوق رأسك... مدد نفسك مثل قط في الشمس... ... تثاءب إذا شعرت بالرغبة... دع جسدك يستيقظ طبيعياً... ... خذ بعض الأنفاس العميقة... اشعر بهواء الصباح النقي يملأ رئتيك... ... جسدك كان له الليل كله للراحة والإصلاح... الآن حان الوقت للاستيقاظ بقصد......",
        
        breathing: "لنؤسس إيقاع تنفس منشط... استنشق من أنفك لأربع عدات... تشعر بالتنبه والحيوية... ... أخرج الهواء من فمك لأربع عدات... اترك كل النعاس... ... مرة أخرى... استنشق الحيوية والطاقة... أخرج التعب والضباب... ... اشعر بجسدك يستيقظ مع كل نفس... عقلك يصبح أوضح... أكثر تركيزاً......",
        
        intention: "الآن لنضع نية لهذا اليوم... ماذا تريد أن تخلق اليوم؟... كيف تريد أن تشعر؟... ... ربما نيتك هي 'أريد أن أكون حاضراً'... أو 'أريد أن أكون لطيفاً'... أو 'أريد أن أكون شجاعاً'... ... اختر نية تتردد مع قلبك... اشعر بها تستقر في كيانك... ... هذه النية ستكون نجمك المرشد طوال اليوم......",
        
        gratitude: "لنأخذ لحظة للامتنان الصباحي... فكر في ثلاثة أشياء أنت ممتن لها... ... ربما لهذا اليوم الجديد... لصحتك... للأشخاص الذين تحبهم... للفرص التي لديك... ... اشعر بهذا الامتنان ينتشر في صدرك... يملؤك بالدفء... ... الامتنان مثل الشمس... يضيء كل ما يلمسه... ... دع هذا التقدير يملأ كل خلية في جسدك... يعدك لرؤية الجمال في اليوم الذي ينتظرك......",
        
        affirmations: "لنملأ عقلك بتأكيدات صباحية إيجابية... 'أرحب بهذا اليوم الجديد بفرح'... ... 'لدي كل ما أحتاجه في داخلي'... ... 'هذا اليوم مليء بالإمكانيات'... ... 'أنا مستعد لاحتضان ما يأتي'... ... 'أشع بالسلام والإيجابية'... ... اشعر بهذه الكلمات ترسخ عميقاً في وعيك......",
        
        closing: "بينما ننهي هذا التأمل الصباحي... خذ لحظة لتقدر هذه الهدية التي أعطيتها لنفسك... ... اشعر بالاستعداد والنشاط ليومك... متمركز في نيتك... مملوء بالامتنان... ... عندما تنهض... احمل هذه الطاقة الواعية معك... ... تذكر... كل صباح فرصة جديدة... صفحة فارغة... ماذا ستفعل بهذا اليوم الجميل؟... ... انهض... أشرق... ودع نورك يلمس العالم......"
      }
    ]
  },

  // Hindi meditation templates
  hi: {
    sleep: [
      {
        name: "शांत नींद के लिए ध्यान",
        intro: "इस शांतिदायक नींद के ध्यान में आपका स्वागत है... अपने बिस्तर पर आराम से लेट जाएं... अपने शरीर को गद्दे में धंसने दें... धीरे से अपनी आंखें बंद करें और अपनी सांस को महसूस करना शुरू करें... अब आपको कुछ भी करने की जरूरत नहीं... बस आराम करें और मेरी आवाज सुनें...",
        
        breathing: "आइए कुछ शांतिदायक सांसों से शुरुआत करते हैं... धीरे से नाक से सांस लें... पांच तक गिनते हुए... एक... दो... तीन... चार... पांच... धीरे से सांस रोकें... एक... दो... तीन... चार... पांच... और अब धीरे से मुंह से सांस छोड़ें... एक... दो... तीन... चार... पांच... अपनी सांस को उसकी प्राकृतिक लय पर वापस आने दें... हर सांस के साथ आप अधिक आराम महसूस कर रहे हैं......",
        
        bodyRelaxation: "अब हम तनाव को मुक्त करने के लिए एक कोमल शरीर स्कैन करेंगे... अपना ध्यान अपने पैरों पर लगाएं... उन्हें भारी और गर्म होते हुए महसूस करें... इस भारीपन को अपनी एड़ियों... पिंडलियों... घुटनों से ऊपर जाने दें... अपने पैरों को बिस्तर में और गहरे धंसते हुए महसूस करें... ... अब अपना ध्यान अपने कूल्हों और कमर के निचले हिस्से पर ले जाएं... उन्हें नरम होकर आराम करने दें... अपने पेट को हर सांस के साथ ऊपर-नीचे होते हुए महसूस करें... आपकी छाती धीरे से फैल रही है... ... अपनी चेतना को अपने कंधों पर ले आएं... उन्हें कानों से दूर गिरने दें... अपनी बाहों का भार महसूस करें... भारी और आराम से... आपके हाथ शांति से आराम कर रहे हैं... ... अपनी गर्दन को महसूस करें... इसे लंबा और नरम होने दें... आपका जबड़ा शिथिल हो जाता है... आपका चेहरा शांत हो जाता है... आपकी आंखों के चारों ओर की छोटी मांसपेशियां भी छूट जाती हैं......",
        
        visualization: "अपने आप को एक शांत जगह पर कल्पना करें... शायद आप एक मुलायम बादल पर लेटे हुए हैं... तारों से भरे आसमान में धीरे से तैर रहे हैं... या शायद आप एक सुंदर बगीचे में आराम कर रहे हैं... लैवेंडर की मुलायम खुशबू से घिरे हुए... हवा एकदम सही तापमान पर है... आप पूर्णतः सुरक्षित और संरक्षित महसूस कर रहे हैं... ... हर सांस के साथ, आप आराम में और गहरे उतरते जा रहे हैं... आपका मन मौन और शांत हो रहा है... चांद को दर्शाती शांत झील की तरह... जो भी विचार आते हैं वे बादलों की तरह तैरते रहते हैं... आपको किसी चीज से चिपके रहने की जरूरत नहीं......",
        
        affirmations: "जब आप यहां पूर्ण शांति में आराम कर रहे हैं... जान लें कि... आप सुरक्षित हैं... आप गर्म हैं... आप संरक्षित हैं... आप प्रेम किए गए हैं... ... आपका शरीर जानता है कि कैसे सोना है... अब छोड़ देना सुरक्षित है... आप इस आराम के हकदार हैं... कल अपना ख्याल रखेगा... ... इस क्षण में... इस वर्तमान में... सब कुछ वैसा ही है जैसा होना चाहिए......",
        
        closing: "इस शांतिपूर्ण अवस्था में आराम करते रहें... आपका शरीर भारी और शिथिल है... आपका मन शांत और मौन है... हर सांस के साथ, आप आरामदायक नींद में और गहरे उतरते जा रहे हैं... ... मैं अब आपको शांतिपूर्ण सपनों में बहने के लिए छोड़ता हूं... अच्छी नींद लें... गहरा आराम करें... और जब समय हो तो तरोताजा होकर जागें... मीठे सपने......"
      }
    ],

    stress: [
      {
        name: "तनाव मुक्ति के लिए सचेतता",
        intro: "तनाव निवारण के इस ध्यान में आपका स्वागत है... आरामदायक बैठने की स्थिति खोजें... आपकी पीठ सीधी हो लेकिन कड़ी नहीं... अपने पैरों को जमीन पर सपाट रखें... अपने नीचे जमीन को महसूस करें... अपने हाथों को धीरे से अपनी जांघों पर रखें... और जब आप तैयार हों... अपनी आंखें बंद करें या धीरे से नीचे की ओर देखें...",
        
        breathing: "आइए कुछ गहरी शुद्धीकरण सांसों से शुरुआत करते हैं... नाक से सांस लें... अपने फेफड़ों को पूरी तरह भरते हुए... और मुंह से सांस छोड़ें... किसी भी तनाव को मुक्त करते हुए... ... फिर से... गहरी सांस लें... अपनी छाती और पेट को फैलते हुए महसूस करें... और सांस छोड़ें... तनाव और चिंता को जाने दें... एक बार और... ताजा शांतिदायक ऊर्जा में सांस लें... और वह सब कुछ छोड़ें जो अब आपकी सेवा नहीं करता......",
        
        bodyAwareness: "अब अपना ध्यान अपने शरीर पर ले आएं... ध्यान दें कि आप कहां तनाव रखे हुए हैं... शायद आपके कंधों में... जबड़े में... पेट में... ... कुछ भी बदलने की कोशिश के बिना... बस इन संवेदनाओं को महसूस करें... उन्हें दयालुता से स्वीकार करें... ... अब कल्पना करें कि आप इन तनावग्रस्त क्षेत्रों में सांस ले रहे हैं... हर सांस के साथ... तनाव में सांस और स्थान भेजते हुए... हर छोड़ने के साथ... कठोरता को नरम होते हुए महसूस करें... ... इस कोमल सांस को जारी रखें... अंदर... स्थान बनाते हुए... बाहर... तनाव छोड़ते हुए......",
        
        mindfulness: "अपने ध्यान को वर्तमान क्षण में टिकने दें... अपनी सांस के अंदर-बाहर आने की संवेदना को महसूस करें... अपनी छाती की कोमल उठक-बैठक... ... जब आपके दिन के बारे में विचार आएं... और वे आएंगे... उन्हें बिना जजमेंट के देखें... आसमान में बहते बादलों की तरह... उन्हें बहने दें... ... अपने ध्यान को अपनी सांस पर वापस ले आएं... यह आपका लंगर है... हमेशा उपलब्ध... हमेशा मौजूद... ... अभी आपको कुछ भी समझने की जरूरत नहीं... कोई समस्या हल करने की जरूरत नहीं... बस यह सांस... फिर अगली......",
        
        closing: "जैसे ही हम इस ध्यान को समाप्त करने की तैयारी करते हैं... जान लें कि शांति की यह भावना हमेशा आपके लिए उपलब्ध है... केवल कुछ सांसों की दूरी पर... ... अपनी उंगलियों और पैर की उंगलियों को हिलाना शुरू करें... धीरे से अपने कंधों को घुमाएं... और जब आप तैयार हों... धीरे से अपनी आंखें खोलें... ... एक पल लेकर देखें कि आप कैसा महसूस कर रहे हैं... इस शांति को अपने साथ ले जाएं जब आप अपना दिन जारी रखें... याद रखें... जब भी आपको जरूरत हो आप हमेशा इस शांत केंद्र पर वापस आ सकते हैं... अपने लिए यह समय निकालने के लिए धन्यवाद......"
      }
    ],

    focus: [
      {
        name: "सांस के सहारे एकाग्रता",
        intro: "एकाग्रता और फोकस के इस ध्यान में आपका स्वागत है... अपनी रीढ़ सीधी और सचेत रखकर आराम से बैठें... अपने हाथों को घुटनों पर या गोद में रखें... स्पष्टता और फोकस का इरादा बनाने के लिए एक पल लें... जब आप तैयार हों... धीरे से अपनी आंखें बंद करें...",
        
        breathing: "तीन गहरी ऊर्जादायक सांसों से शुरुआत करें... नाक से सांस लें... अपने फेफड़ों को ताजी हवा से भरते हुए... और मुंह से पूरी तरह सांस छोड़ें... ... फिर से... गहरी सांस लें... सचेत और जीवंत महसूस करते हुए... पूरी तरह सांस छोड़ें... किसी भी मानसिक धुंध को छोड़ते हुए... एक बार और... स्पष्टता में सांस लें... भटकाव को छोड़ें... ... अब अपनी सांस को सामान्य होने दें... लेकिन हर सांस पर अपना ध्यान रखें......",
        
        concentration: "अब हम आपकी सांस को आपके ध्यान के लंगर के रूप में उपयोग करेंगे... अपनी नाक में हवा के प्रवेश की संवेदना पर ध्यान दें... सांस लेते समय ठंडी... छोड़ते समय गर्म... ... अपना ध्यान नाक की नोक पर रखें... जहां आप पहली बार सांस महसूस करते हैं... ... जब आपका मन भटकता है... और वह भटकेगा... बस देखें कि वह कहां गया... फिर धीरे से... बिना जजमेंट के... अपना ध्यान सांस पर वापस ले आएं... यही अभ्यास है... देखना... वापस आना... बार-बार......",
        
        affirmations: "फोकस के लिए इन अभिपुष्टियों को मानसिक रूप से दोहराएं... 'मेरा मन स्पष्ट और तेज है'... ... 'मैं पूर्णतः उपस्थित और सचेत हूं'... ... 'मेरी एकाग्रता मजबूत और स्थिर है'... ... 'मैं आसानी और स्पष्टता से फोकस करता हूं'... ... इन शब्दों को अपनी चेतना में गहरे उतरने दें......",
        
        closing: "जैसे ही हम इस ध्यान को समाप्त करते हैं... अपने मन में बेहतर स्पष्टता महसूस करें... फोकस करने की अपनी बेहतर क्षमता... ... अपनी सांस को गहरा करना शुरू करें... अपनी उंगलियों और पैर की उंगलियों को हिलाएं... और जब आप तैयार हों... अपनी आंखें खोलें... ... देखें कि आप कितने सचेत और फोकस्ड महसूस कर रहे हैं... आपका मन स्पष्ट... तेज और तैयार है... इस केंद्रित ध्यान को अपनी अगली गतिविधि में ले जाएं... आप सटीकता और स्पष्टता के साथ काम करने के लिए तैयार हैं......"
      }
    ],

    anxiety: [
      {
        name: "चिंता निवारण के लिए भूमिकरण",
        intro: "चिंता निवारण के इस ध्यान में आपका स्वागत है... ऐसी आरामदायक स्थिति खोजें जहां आप समर्थित और सुरक्षित महसूस करें... आप एक हाथ अपने दिल पर और दूसरा अपने पेट पर रख सकते हैं... यह आपको भूमिकृत और अपने साथ जुड़ा हुआ महसूस करने में मदद करता है... पूरी तरह यहां पहुंचने के लिए एक पल लें...",
        
        grounding: "आइए वर्तमान क्षण में खुद को भूमिकृत करने से शुरुआत करते हैं... अपने पैरों को जमीन पर महसूस करें... या कुर्सी में अपने शरीर को... पांच चीजों पर ध्यान दें जिन्हें आप अभी महसूस कर सकते हैं... हवा का तापमान... अपने कपड़ों की बनावट... अपने शरीर का भार... ... यह वास्तविक है... यह अभी है... आप इस क्षण में सुरक्षित हैं......",
        
        breathingTechnique: "अब हम एक शांतिदायक सांस पैटर्न का उपयोग करेंगे... चार गिनती के लिए धीरे से सांस लें... एक... दो... तीन... चार... चार के लिए धीरे से रोकें... एक... दो... तीन... चार... और छह के लिए धीरे से सांस छोड़ें... एक... दो... तीन... चार... पांच... छह... ... यह लंबी सांस छोड़ना आपके शरीर की विश्राम प्रतिक्रिया को सक्रिय करता है... फिर से... चार के लिए अंदर... चार के लिए रोकें... छह के लिए बाहर... ... इस शांतिदायक लय को जारी रखें... हर चक्र के साथ अधिक शांत महसूस करते हुए......",
        
        affirmations: "आइए अपने आप को कुछ शांतिदायक अभिपुष्टियां दें... 'मैं इस क्षण में सुरक्षित हूं'... ... 'यह भावना बीत जाएगी'... ... 'मैंने पहले भी चिंता से निपटा है और फिर से निपटूंगा'... ... 'मैं अपनी चिंता से अधिक मजबूत हूं'... ... 'शांति मेरी प्राकृतिक अवस्था है'... ... 'मैं शांति चुनता हूं'......",
        
        closing: "जैसे ही हम इस ध्यान को समाप्त करते हैं... याद रखें कि आपके पास ये उपकरण हमेशा उपलब्ध हैं... आपकी सांस... आपकी सुरक्षित जगह... आपकी आंतरिक शक्ति... ... अपने शरीर को धीरे से हिलाना शुरू करें... शायद थोड़ा खिंचाव करें... एक गहरी सांस लें और धीरे से अपनी आंखें खोलें... ... आप जो महसूस कर रहे हैं उसमें किसी भी बदलाव को देखें... छोटा बदलाव भी महत्वपूर्ण है... अपने दिन में वापस जाते समय अपने साथ कोमल रहें... आप साहसी हैं... आप सक्षम हैं... और आप अकेले नहीं हैं......"
      }
    ],

    energy: [
      {
        name: "स्वर्णिम सूर्य ऊर्जा",
        intro: "इस ऊर्जादायक ध्यान में आपका स्वागत है... ऐसी स्थिति में बैठें या खड़े हों जो मजबूत और सचेत लगे... कल्पना करें कि एक रस्सी आपको आपके सिर के मुकुट से ऊपर खींच रही है... अपनी रीढ़ को लंबा होते हुए महसूस करें... अपनी छाती खुलते हुए... आप अपनी प्राकृतिक जीवन शक्ति जगाने वाले हैं...",
        
        breathing: "आइए कुछ ऊर्जादायक सांसों से शुरुआत करते हैं... नाक से गहरी सांस लें... अपने पूरे शरीर को ताजी ऊर्जा से भरते हुए... और 'हा' की आवाज के साथ मुंह से जोर से सांस छोड़ें... किसी भी थकान को मुक्त करते हुए... ... फिर से... जीवन शक्ति और प्राण शक्ति में सांस लें... और 'हा' छोड़ें... आलस्य को जाने देते हुए... एक बार और... शक्ति और ऊर्जा में सांस लें... 'हा' छोड़ें... अधिक जागृत महसूस करते हुए......",
        
        energyVisualization: "अपनी छाती के केंद्र में एक चमकदार स्वर्णिम सूर्य की कल्पना करें... यह आपका आंतरिक ऊर्जा स्रोत है... हर सांस के साथ... यह सूर्य अधिक चमकदार और बड़ा होता जाता है... ... इसकी गर्म किरणों को अपने पूरे शरीर में फैलते हुए महसूस करें... ऊपर की ओर आपकी छाती और कंधों से होकर... नीचे की ओर आपकी बाहों से होकर उंगलियों के सिरों तक... जो ऊर्जा से सिहर रहे हैं... ... स्वर्णिम प्रकाश ऊपर की ओर आपके गले और सिर से होकर बहता है... आपका मन स्पष्ट और सचेत हो जाता है... नीचे की ओर आपके पेट और कूल्हों से होकर... आपके पैरों से होकर... आपको धरती से जोड़ता हुआ जबकि ऊर्जा देता है... ... आपका पूरा शरीर जीवंत जीवन शक्ति से चमक रहा है......",
        
        affirmations: "आइए शक्तिशाली अभिपुष्टियों से अपनी ऊर्जा को सक्रिय करते हैं... 'मैं जीवंत ऊर्जा से भरा हूं'... ... 'मेरा शरीर मजबूत और जीवित है'... ... 'मेरे पास अपने दिन के लिए आवश्यक सभी ऊर्जा है'... ... 'मैं प्रेरित हूं और कार्य के लिए तैयार हूं'... ... 'ऊर्जा मेरे माध्यम से स्वतंत्र रूप से बहती है'... ... इन शब्दों को अपने शरीर की हर कोशिका को चार्ज करते हुए महसूस करें......",
        
        closing: "जैसे ही हम इस ऊर्जादायक ध्यान को समाप्त करते हैं... अपनी नसों में बहती जीवन शक्ति को महसूस करें... आप जागृत हैं... सचेत हैं और पूरी तरह चार्ज हैं... ... अपने शरीर को हिलाना शुरू करें जैसा अच्छा लगे... शायद अपनी बाहों को सिर के ऊपर तक फैलाएं... अपनी गर्दन घुमाएं... अपने पैर की उंगलियों पर धीरे से उछलें... ... जब आप तैयार हों... अपनी आंखें चौड़ी करके खोलें... ताजी ऊर्जा के साथ दुनिया को अपनाएं... आप उत्साह और शक्ति के साथ अपने दिन को अपनाने के लिए तैयार हैं... आगे बढ़ें और अपनी रोशनी चमकने दें......"
      }
    ],

    mindfulness: [
      {
        name: "वर्तमान क्षण की जागरूकता",
        intro: "इस सचेतता ध्यान में आपका स्वागत है... एक आरामदायक स्थिति खोजें जहां आप सतर्कता और आसानी के साथ बैठ सकें... यह अभ्यास वर्तमान क्षण की जागरूकता विकसित करने के बारे में है... कहीं जाने की जरूरत नहीं और कुछ पूरा करने की जरूरत नहीं... बस यहीं अभी रहना है...",
        
        breathing: "आइए अपने आप को सांस में स्थापित करने से शुरुआत करते हैं... अपनी प्राकृतिक सांस की लय को देखें... इसे बदलें नहीं... बस देखें... ... हवा को अपनी नाक से अंदर आते हुए महसूस करें... हल्का विराम... और कोमल मुक्ति... ... आपकी सांस हमेशा वर्तमान क्षण में प्रकट होती है... इसे यहां और अभी के लिए अपने लंगर के रूप में उपयोग करें... जब आपका मन भटकता है... बस सांस पर वापस आ जाएं... बिना जजमेंट के... केवल एक कोमल वापसी......",
        
        bodyAwareness: "अब अपनी जागरूकता को अपने शरीर को शामिल करने के लिए बढ़ाएं... देखें कि आप कैसे बैठे हैं... उन संपर्क बिंदुओं को महसूस करें जहां आपका शरीर सतह से मिलता है... ... कोमल जिज्ञासा के साथ अपने शरीर को स्कैन करें... अभी क्या संवेदनाएं मौजूद हैं?... शायद गर्मी... ठंडक... तनाव... आराम... ... बस देखें कि वहां क्या है... कुछ भी बदलने की कोशिश के बिना... आपका शरीर उपस्थिति का द्वार है......",
        
        thoughtAwareness: "जैसे ही हम आगे बढ़ते हैं... किसी भी विचार को देखें जो उत्पन्न होता है... कहानी में फंसने के बजाय... देखें कि क्या आप विचारों को अपने मन के आसमान में बहते बादलों की तरह देख सकते हैं... ... कुछ विचार हल्के और धुंधले हैं... अन्य भारी तूफानी बादल हो सकते हैं... सभी का स्वागत है... सभी बीत जाएंगे... ... आप अपने विचार नहीं हैं... आप वह चेतन स्थान हैं जिसमें विचार प्रकट होते और गायब हो जाते हैं......",
        
        presentMoment: "इसी क्षण में... इस सटीक पल में... सब कुछ वैसा ही है जैसा है... जो कुछ है उसे स्वीकार करने में गहरी शांति है... बिना प्रतिरोध के... ... अपने चारों ओर की आवाजों को सुनें... देखें कि वे हर क्षण ताजी आती हैं... ... अपने शरीर में जीवंतता महसूस करें... यहां होने की ऊर्जा... अभी... ... यह क्षण एकमात्र क्षण है जो कभी अस्तित्व में है... और यह लगातार नवीनीकृत होता रहता है......",
        
        closing: "जैसे ही हम इस अभ्यास को समाप्त करते हैं... एक पल लेकर सराहना करें कि आपने अपने आप को उपस्थिति का उपहार दिया है... ... देखें कि सचेत जागरूकता में समय बिताने के बाद आप कैसा महसूस करते हैं... ... जब आप तैयार हों... धीरे से अपनी आंखें खोलें यदि वे बंद थीं... ... देखें कि क्या आप इस उपस्थिति की गुणवत्ता को अपने साथ ले जा सकते हैं... अपनी अगली गतिविधि में... और अपने पूरे दिन भर... वर्तमान क्षण हमेशा उपलब्ध है... हमेशा आपकी वापसी का इंतजार कर रहा है......"
      }
    ],

    compassion: [
      {
        name: "प्रेमपूर्ण दयालुता का अभ्यास",
        intro: "इस करुणा ध्यान में आपका स्वागत है... खुले दिल के साथ आरामदायक स्थिति में बैठें... हम प्रेमपूर्ण दयालुता विकसित करेंगे... पहले अपने लिए... फिर दूसरों के लिए इसे बढ़ाते हुए... यह हृदय खोलने का अभ्यास है...",
        
        selfCompassion: "अपने आप को मन में लाने से शुरुआत करें... अपने आप की कल्पना करें जैसे आप अभी हैं... अपने आप को दयालु आंखों से देखें... जैसे आप एक प्रिय मित्र को देखेंगे... ... मौन रूप से अपने आप को प्रेमपूर्ण दयालुता के ये शब्द अर्पित करें... 'मैं खुश रहूं... मैं स्वस्थ रहूं... मैं शांति में रहूं... मैं आसानी से जीऊं...' ... अपने हृदय में इन इच्छाओं को महसूस करें... किसी भी प्रतिरोध को देखें... और उसके साथ भी कोमल रहें... आप प्रेम के हकदार हैं... विशेष रूप से अपने आप से......",
        
        lovedOne: "अब किसी ऐसे व्यक्ति को मन में लाएं जिससे आप आसानी से प्रेम करते हैं... परिवार का कोई सदस्य... एक करीबी दोस्त... एक प्रिय पालतू जानवर... उनका चेहरा देखें... उनके लिए अपने प्राकृतिक स्नेह को महसूस करें... ... समान प्रेमपूर्ण इच्छाएं फैलाएं... 'आप खुश रहें... आप स्वस्थ रहें... आप शांति में रहें... आप आसानी से जीएं...' ... अपने हृदय में गर्मी महसूस करें जब आप उन्हें प्रेम भेजते हैं... देखें कि किसी की भलाई चाहना कितना अच्छा लगता है......",
        
        neutral: "अब किसी तटस्थ व्यक्ति के बारे में सोचें... शायद कोई कैशियर जिसे आप नियमित रूप से देखते हैं... कोई पड़ोसी जिसे आप मुश्किल से जानते हैं... कोई व्यक्ति जो न मित्र है न शत्रु... ... समान दयालुता का विस्तार करने का अभ्यास करें... 'आप खुश रहें... आप स्वस्थ रहें... आप शांति में रहें... आप आसानी से जीएं...' ... यह व्यक्ति आपकी तरह खुश रहना चाहता है... आपकी तरह संघर्षों का सामना करता है... देखें कि क्या आप अपनी साझा मानवता से जुड़ सकते हैं......",
        
        difficult: "यदि आप तैयार महसूस करते हैं... किसी ऐसे व्यक्ति को मन में लाएं जिसके साथ आपकी कठिनाइयां हैं... किसी थोड़े से चुनौतीपूर्ण व्यक्ति से शुरुआत करें... अपने जीवन के सबसे कठिन व्यक्ति से नहीं... ... यह कठिन लग सकता है... धीरे चलें... 'आप खुश रहें... आप स्वस्थ रहें... आप शांति में रहें... आप आसानी से जीएं...' ... याद रखें... उनकी खुशी आपकी खुशी से कुछ नहीं छीनती... घायल लोग अक्सर दूसरों को घायल करते हैं... क्या आप उनके दर्द के लिए करुणा पा सकते हैं?......",
        
        universal: "अंत में... अपनी जागरूकता को हर जगह के सभी प्राणियों को शामिल करने के लिए बढ़ाएं... अंतरिक्ष से पृथ्वी को देखें... सभी जीव... सभी मनुष्य... संघर्ष कर रहे और खुशी की तलाश कर रहे... ... खुले हृदय के साथ... इस सार्वभौमिक दयालुता को अर्पित करें... 'सभी प्राणी खुश रहें... सभी प्राणी स्वस्थ रहें... सभी प्राणी शांति में रहें... सभी प्राणी आसानी से जीएं...' ... अपने आप को इस विशाल जुड़ाव के नेटवर्क का हिस्सा महसूस करें... प्रेम देते और प्राप्त करते हुए......",
        
        closing: "अपना हाथ फिर से अपने हृदय पर रखें... वहां की गर्मी महसूस करें... जो प्रेम आपने उत्पन्न किया है... यह दयालुता हमेशा आपमें जीवित रहती है... ... याद रखें... सच्ची करुणा में आप शामिल हैं... अपने दिन के दौरान अपने साथ कोमल रहें... ... जब आप दूसरों से मिलें... देखें कि क्या आप इस हृदय संबंध को याद रख सकते हैं... हर कोई अपने पास जो है उसके साथ अपना सर्वश्रेष्ठ कर रहा है... हर कोई प्रेम का हकदार है... आपसे शुरुआत करते हुए......"
      }
    ],

    walking: [
      {
        name: "सचेत चलने का अभ्यास",
        intro: "इस चलने के ध्यान में आपका स्वागत है... आप इस अभ्यास को कहीं भी कर सकते हैं... घर के अंदर एक शांत स्थान में... या बाहर प्रकृति में... स्थिर खड़े होने से शुरुआत करें... अपने पैरों को जमीन पर महसूस करें... हम चलने को ध्यान में बदल देंगे...",
        
        preparation: "कूल्हों की चौड़ाई के बराबर पैरों के साथ खड़े होने से शुरुआत करें... अपने पैरों और पृथ्वी के बीच संपर्क महसूस करें... अपने आसन को देखें... रीढ़ सीधी लेकिन कड़ी नहीं... कंधे आराम से... बाहें प्राकृतिक रूप से किनारों पर लटकी हुई... ... कुछ गहरी सांसें लें... अपने शरीर में... इस क्षण में पूरी तरह पहुंच जाएं... सचेतता के साथ चलने का इरादा रखें... हर कदम एक ध्यान......",
        
        firstSteps: "अपना दाहिना पैर धीरे से उठाना शुरू करें... अपने बाएं पैर पर भार के स्थानांतरण को देखें... उठाने... हिलने... अपने पैर को रखने को महसूस करें... ... हर कदम को जानबूझकर उठाएं... अपनी सामान्य चलने की गति का लगभग आधा... कोई गंतव्य नहीं... कोई जल्दी नहीं... केवल चलने का सरल कार्य... ... देखें कि आपका शरीर कैसे प्राकृतिक रूप से संतुलन बनाता है... समन्वय करता है... स्थान में घूमता है... इस रोजमर्रा के चमत्कार पर आश्चर्य करें......",
        
        breathAndSteps: "अब अपनी सांस को अपने कदमों के साथ समन्वित करें... शायद सांस लेते समय दो कदम... सांस छोड़ते समय दो कदम... एक लय खोजें जो प्राकृतिक लगे... ... यदि आपका मन आपके गंतव्य या कार्य सूची की ओर भटकता है... ध्यान को धीरे से चलने की भौतिक संवेदना पर वापस ले आएं... आपके पैरों का जमीन को छूने की भावना... उठना... आगे बढ़ना......",
        
        awareness: "अपनी जागरूकता को अपने वातावरण को शामिल करने के लिए बढ़ाएं... यदि आप बाहर हैं... हवा के तापमान को देखें... किसी भी हवा को... प्रकृति की आवाजों को... पक्षियों को... सरसराते पत्तों को... ... यदि आप अंदर हैं... अपने चारों ओर की जगह के प्रति सचेत रहें... रोशनी... हवा की गुणवत्ता... ... अपने वातावरण को आत्मसात करते हुए चलने की संवेदना से जुड़े रहें... आंतरिक जागरूकता और बाहरी उपस्थिति के बीच नृत्य की तरह चलना......",
        
        gratitude: "जैसे ही आप चलना जारी रखते हैं... इस अद्भुत शरीर के लिए प्रशंसा लाएं... आपके पैर जो आपको ले जाते हैं... आपके पैर जो आपका समर्थन करते हैं... आपका संतुलन जो आपको स्थिर रखता है... ... दुनिया में घूमने की अपनी क्षमता के लिए कृतज्ञता महसूस करें... हर किसी के पास यह उपहार नहीं है... हर कदम एक विशेषाधिकार है... ... देखें कि चलने का ध्यान कैसे गति में एक अभयारण्य बनाता है... गति में शांति......",
        
        closing: "जैसे ही हम इस चलने के अभ्यास को समाप्त करते हैं... खड़े होने की स्थिति में वापस आएं... अपने पैरों को जमीन पर मजबूती से महसूस करें... ... इस सरल लेकिन गहरे अभ्यास की सराहना करने के लिए एक पल लें... आप इस जागरूकता को किसी भी चलने में ला सकते हैं... सामान्य कदमों को ध्यान के क्षणों में बदल सकते हैं... ... इस सचेत उपस्थिति को अपने साथ ले जाएं... अपनी अगली गतिविधि में... हर कदम वर्तमान क्षण में वापसी हो सकता है......"
      }
    ],

    breathing: [
      {
        name: "पूर्ण श्वास अभ्यास",
        intro: "इस श्वास ध्यान में आपका स्वागत है... एक आरामदायक स्थिति खोजें जहां आपकी रीढ़ सीधी हो सके... एक हाथ अपनी छाती पर और दूसरा अपने पेट पर रखें... हम पूर्ण चेतन श्वास का अन्वेषण करेंगे...",
        
        naturalBreath: "अपनी प्राकृतिक सांस को देखने से शुरुआत करें... इसे बदले बिना... बस इसे देखें... ... अपने हाथों के नीचे हलचल महसूस करें... कौन सा हाथ अधिक हिलता है?... अधिकतर लोग मुख्यतः छाती से सांस लेते हैं... लेकिन हम पूरे शरीर से सांस लेना सीखेंगे......",
        
        deepBreathing: "अब धीरे से सांस को गहरा करना शुरू करें... नाक से धीरे सांस लें... हवा को पहले अपने पेट को भरने दें... ... अपने पेट पर रखे हाथ को ऊपर उठते हुए महसूस करें... अपना डायाफ्राम फैलते हुए... ... अपनी छाती को भरना जारी रखें... अपनी छाती पर रखे हाथ को ऊपर उठते हुए महसूस करें... पसलियां फैलती हुई... ... सांस लेने के शिखर पर एक कोमल विराम करें... इस सारी जीवन शक्ति को धारण करते हुए... ... अब धीरे से सांस छोड़ें... हवा को अपनी छाती से धीरे से निकलने दें... फिर अपने पेट से... ... हर सांस छोड़ने के साथ अपने शरीर को आराम करते हुए महसूस करें......",
        
        breathCounting: "अब एक लय खोजते हैं... चार गिनती के लिए सांस लें... एक... दो... तीन... चार... ... दो गिनती के लिए कोमल विराम... एक... दो... ... छह गिनती के लिए सांस छोड़ें... एक... दो... तीन... चार... पांच... छह... ... यह लंबी सांस छोड़ना आपके शरीर की विश्राम प्रतिक्रिया को सक्रिय करती है... ... इस लय को जारी रखें... 4 गिनती अंदर... 2 विराम... 6 गिनती बाहर... अपनी आरामदायक लय खोजें......",
        
        breathAwareness: "जैसे ही आप इस लयबद्ध सांस को जारी रखते हैं... सूक्ष्म संवेदनाओं को देखें... अंदर आती ठंडी हवा... बाहर जाती गर्म हवा... ... सांस लेने और छोड़ने के बीच प्राकृतिक विराम... स्थिरता... शांति... ... महसूस करें कि यह चेतन सांस कैसे आपके तंत्रिका तंत्र को शांत करती है... आपके मन को शांत करती है... आपके शरीर को आराम देती है... ... हर सांस एक उपहार है... वर्तमान में वापस आने का अवसर......",
        
        affirmations: "हर सांस लेने के साथ... इन गुणों में सांस लें... 'मैं शांति में सांस लेता हूं'... ... 'मैं स्पष्टता में सांस लेता हूं'... ... 'मैं जीवन शक्ति में सांस लेता हूं'... ... हर सांस छोड़ने के साथ... छोड़ दें... 'मैं तनाव छोड़ता हूं'... ... 'मैं चिंताएं छोड़ता हूं'... ... 'मैं वह सब कुछ छोड़ता हूं जो अब मेरी सेवा नहीं करता'...",
        
        closing: "जैसे ही हम इस श्वास अभ्यास को समाप्त करते हैं... अपनी सांस को सामान्य होने दें... लेकिन सांस की इस जागरूकता को रखें... ... देखें कि आप कैसा महसूस करते हैं... अधिक शांत... अधिक केंद्रित... अधिक जीवंत... ... याद रखें... आपकी सांस हमेशा आपके साथ है... शांति और उपस्थिति के लिए एक निरंतर उपकरण... ... जब भी आप तनावग्रस्त या विचलित महसूस करें... आप इस चेतन सांस पर वापस आ सकते हैं... आपकी सांस आपका घर है......"
      }
    ],

    morning: [
      {
        name: "प्रभात जागरण अभ्यास",
        intro: "इस प्रातःकालीन ध्यान में आपका स्वागत है... जैसे ही आप अपना दिन शुरू करते हैं... यह समय लें कि धीरे से जागें... केवल अपने शरीर को नहीं... बल्कि अपने मन और हृदय को भी... हर सुबह एक पुनर्जन्म है... नए सिरे से शुरुआत करने का मौका...",
        
        awakening: "अपने शरीर को धीरे से खींचने से शुरुआत करें... अपनी बाहों को सिर के ऊपर उठाएं... धूप में बिल्ली की तरह खिंचाव करें... ... यदि मन करे तो जम्हाई लें... अपने शरीर को प्राकृतिक रूप से जागने दें... ... कुछ गहरी सांसें लें... सुबह की ताजी हवा को अपने फेफड़ों में भरते हुए महसूस करें... ... आपके शरीर के पास पूरी रात आराम करने और मरम्मत करने का समय था... अब इरादे के साथ जागने का समय है......",
        
        breathing: "आइए एक ऊर्जादायक सांस की लय स्थापित करते हैं... नाक से चार गिनती के लिए सांस लें... सचेत और जीवंत महसूस करते हुए... ... मुंह से चार गिनती के लिए सांस छोड़ें... सारी नींद को छोड़ते हुए... ... फिर से... जीवन शक्ति और ऊर्जा में सांस लें... थकान और धुंध को छोड़ें... ... हर सांस के साथ अपने शरीर को जागते हुए महसूस करें... आपका मन अधिक स्पष्ट होता जा रहा है... अधिक केंद्रित......",
        
        intention: "अब इस दिन के लिए एक इरादा रखते हैं... आज आप क्या बनाना चाहते हैं?... आप कैसा महसूस करना चाहते हैं?... ... शायद आपका इरादा है 'मैं उपस्थित रहना चाहता हूं'... या 'मैं दयालु रहना चाहता हूं'... या 'मैं साहसी रहना चाहता हूं'... ... एक इरादा चुनें जो आपके हृदय के साथ गूंजता हो... इसे अपने अस्तित्व में बसते हुए महसूस करें... ... यह इरादा पूरे दिन आपका मार्गदर्शक तारा होगा......",
        
        gratitude: "आइए सुबह की कृतज्ञता के लिए एक पल लेते हैं... तीन चीजों के बारे में सोचें जिनके लिए आप आभारी हैं... ... शायद इस नए दिन के लिए... अपने स्वास्थ्य के लिए... उन लोगों के लिए जिन्हें आप प्यार करते हैं... उन अवसरों के लिए जो आपके पास हैं... ... इस कृतज्ञता को अपनी छाती में फैलते हुए महसूस करें... आपको गर्मजोशी से भरते हुए... ... कृतज्ञता सूर्य की तरह है... यह जिस चीज को छूती है उसे रोशन करती है... ... इस प्रशंसा को अपने शरीर की हर कोशिका को भरने दें... आपको आने वाले दिन में सुंदरता देखने के लिए तैयार करते हुए......",
        
        affirmations: "आइए अपने मन को सकारात्मक सुबह की पुष्टियों से भरते हैं... 'मैं इस नए दिन का खुशी से स्वागत करता हूं'... ... 'मेरे पास वह सब कुछ है जिसकी मुझे जरूरत है'... ... 'यह दिन संभावनाओं से भरा है'... ... 'मैं जो कुछ भी आता है उसे अपनाने के लिए तैयार हूं'... ... 'मैं शांति और सकारात्मकता बिखेरता हूं'... ... इन शब्दों को अपनी चेतना में गहरे जड़ जमाते हुए महसूस करें......",
        
        closing: "जैसे ही हम इस प्रातःकालीन ध्यान को समाप्त करते हैं... इस उपहार की सराहना करने के लिए एक पल लें जो आपने अपने आप को दिया है... ... अपने दिन के लिए तैयार और ऊर्जावान महसूस करें... अपने इरादे में केंद्रित... कृतज्ञता से भरे... ... जब आप उठें... इस चेतन ऊर्जा को अपने साथ ले जाएं... ... याद रखें... हर सुबह एक नया मौका है... एक खाली पन्ना... आप इस सुंदर दिन का क्या करेंगे?... ... उठिए... चमकिए... और अपनी रोशनी को दुनिया को छूने दें......"
      }
    ]
  }
};

// Function to generate a complete meditation based on type and duration
function generateMeditation(type, durationMinutes, language = 'en') {
  const languageTemplates = meditationTemplates[language];
  if (!languageTemplates) {
    console.log(`Language ${language} not available. Using English.`);
    language = 'en';
  }

  const typeTemplates = meditationTemplates[language][type];
  if (!typeTemplates || !Array.isArray(typeTemplates) || typeTemplates.length === 0) {
    throw new Error(`Unknown meditation type: ${type} for language: ${language}`);
  }

  // Select a random template variation
  const template = typeTemplates[Math.floor(Math.random() * typeTemplates.length)];

  let meditation = '';
  
  // Always include intro
  meditation += template.intro + '\n\n';
  
  // Add sections based on duration
  if (durationMinutes <= 3) {
    // Short version: intro + breathing + main practice + closing
    meditation += template.breathing + '\n\n';
    const sections = Object.keys(template).filter(key => key !== 'intro' && key !== 'name' && key !== 'closing');
    if (sections.length > 1) {
      meditation += template[sections[1]] + '\n\n'; // Main practice (varies by type)
    }
    meditation += template.closing;
  } else if (durationMinutes <= 5) {
    // Medium version: all sections but shortened
    Object.keys(template).forEach(section => {
      if (section !== 'intro' && section !== 'name' && section !== 'closing') {
        meditation += template[section] + '\n\n';
      }
    });
    meditation += template.closing;
  } else if (durationMinutes <= 10) {
    // Long version: all sections with repetition
    Object.keys(template).forEach((section, index) => {
      if (section !== 'intro' && section !== 'name' && section !== 'closing') {
        meditation += template[section] + '\n\n';
        // Add extra pause between major sections
        if (index < Object.keys(template).length - 2) {
          meditation += '......\n\n';
        }
      }
    });
    meditation += template.closing;
  } else {
    // Very long version: repeat main sections
    const sections = Object.keys(template).filter(key => key !== 'intro' && key !== 'name' && key !== 'closing');
    
    // Add breathing first
    if (template.breathing) {
      meditation += template.breathing + '\n\n......\n\n';
    }
    
    // Repeat middle sections for longer meditations
    const repeatSections = Math.floor((durationMinutes - 5) / 5);
    const mainSections = sections.filter(section => section !== 'breathing');
    
    for (let i = 0; i < repeatSections + 1; i++) {
      mainSections.forEach(section => {
        meditation += template[section] + '\n\n';
        if (i < repeatSections) {
          meditation += '......\n\n';
        }
      });
    }
    
    meditation += template.closing;
  }
  
  return meditation.trim();
}

module.exports = {
  meditationTemplates,
  generateMeditation
};