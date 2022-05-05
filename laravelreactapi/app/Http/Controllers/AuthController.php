<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'name'=>'required|max:191',
            'email'=>'required|email|unique:users,email',
            'password' =>'required|min:8',
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->errors(),
            ]);
        }else{
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $token = $user->createToken($user->email.'_token')->plainTextToken;
            return response()->json([
                'status' =>200,
                'username' =>$user->name,
                'token' =>$token,
                'message' => 'Register Successfully'
            ]);
        }
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(),[
            'email'=>'required',
            'password' =>'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->errors(),
            ]);
        }else{
            $user = User::where('email',$request->email)->first();
            if (!$user || !Hash::check($request->password,$user->password)){
                return response()->json([
                    'status' => 401,
                    'message' => "Invalid Credentials"
                ]);
            }else{
                $token = $user->createToken($user->email.'_token')->plainTextToken;
                return response()->json([
                    'status' =>200,
                    'username' =>$user->name,
                    'token' =>$token,
                    'message' => 'Logged In Successfully'
                ]);
            }
        }
    }


    public function logout(){
        Auth::user()->tokens->each(function($token, $key) {
            $token->delete();
        });
        return response()->json([
            'status' => 200,
            "message" => "Logged Out Successfully"
        ]);
    }
}
